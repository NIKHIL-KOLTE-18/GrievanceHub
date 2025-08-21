using GrievanceAnalyticsService.DTOs;
using GrievanceAnalyticsService.Entities;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace GrievanceAnalyticsService.Repositories
{
    public class AnalyticsRepository : IAnalyticsRepository
    {
        private readonly string _connectionString;
        private readonly ILogger<AnalyticsRepository> _logger;

        public AnalyticsRepository(IConfiguration configuration, ILogger<AnalyticsRepository> logger)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
            _logger = logger;
            
            if (string.IsNullOrEmpty(_connectionString))
            {
                _logger.LogError("Connection string 'DefaultConnection' is null or empty");
                throw new InvalidOperationException("Connection string 'DefaultConnection' is not configured");
            }
            
            _logger.LogInformation("AnalyticsRepository initialized with connection string: {ConnectionString}", 
                _connectionString.Replace("Password=", "Password=***"));
        }

        public GrievanceStatsDTO GetGrievanceStats()
        {
            GrievanceStatsDTO stats = new();

            try
            {
                using SqlConnection con = new(_connectionString);
                string query = @"
    SELECT 
        SUM(CASE WHEN status = 'Open' THEN 1 ELSE 0 END) AS Open,
        SUM(CASE WHEN status = 'Pending' THEN 1 ELSE 0 END) AS Pending,
        SUM(CASE WHEN status IN ('Closed', 'Resolved') THEN 1 ELSE 0 END) AS Resolved
    FROM Grievances;
";

                _logger.LogInformation("Executing GetGrievanceStats query");
                con.Open();

                // Get total grievances count separately
                using (SqlCommand cmdTotal = new SqlCommand("SELECT COUNT(*) FROM Grievances", con))
                {
                    stats.TotalGrievances = (int)cmdTotal.ExecuteScalar();
                }

                using SqlCommand cmd = new(query, con);
                using SqlDataReader reader = cmd.ExecuteReader();
                if (reader.Read())
                {
                    stats.Open = reader["Open"] == DBNull.Value ? 0 : (int)reader["Open"];
                    stats.Pending = reader["Pending"] == DBNull.Value ? 0 : (int)reader["Pending"];
                    stats.Resolved = reader["Resolved"] == DBNull.Value ? 0 : (int)reader["Resolved"];
                }

                _logger.LogInformation("GetGrievanceStats completed successfully. Total: {Total}, Open: {Open}, Pending: {Pending}, Resolved: {Resolved}", 
                    stats.TotalGrievances, stats.Open, stats.Pending, stats.Resolved);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in GetGrievanceStats: {Message}", ex.Message);
                throw;
            }

            return stats;
        }



        public int GetTotalGrievances()
        {
            using SqlConnection con = new(_connectionString);
            string query = "SELECT COUNT(*) FROM Grievances";
            using SqlCommand cmd = new(query, con);
            con.Open();
            return (int)cmd.ExecuteScalar();
        }

        public Dictionary<string, int> GetGrievancesByStatus()
        {
            Dictionary<string, int> result = new();

            using SqlConnection con = new(_connectionString);
            string query = "SELECT Status, COUNT(*) AS Count FROM Grievances GROUP BY Status";
            using SqlCommand cmd = new(query, con);
            con.Open();

            using SqlDataReader dr = cmd.ExecuteReader();
            while (dr.Read())
            {
                result.Add(dr["Status"].ToString(), (int)dr["Count"]);
            }

            return result;
        }


        public int AddGrievance(Grievance grievance)
        {
            try
            {
                using SqlConnection con = new(_connectionString);
                con.Open();
                string query = @"
    INSERT INTO Grievances (
        Title, Status, CreatedDate, StudentId, CategoryId, Description
    ) 
    VALUES (
        @Title, @Status, @CreatedDate, @StudentId, @CategoryId, @Description
    );
    SELECT CAST(SCOPE_IDENTITY() AS int);
    ";

                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    cmd.Parameters.AddWithValue("@Title", grievance.Title);
                    cmd.Parameters.AddWithValue("@Status", grievance.Status);
                    cmd.Parameters.AddWithValue("@CreatedDate", grievance.CreatedDate);
                    cmd.Parameters.AddWithValue("@StudentId", grievance.StudentId);
                    cmd.Parameters.AddWithValue("@CategoryId", grievance.CategoryId);
                    cmd.Parameters.AddWithValue("@Description", grievance.Description ?? (object)DBNull.Value);

                    int newId = (int)cmd.ExecuteScalar();
                    _logger.LogInformation("Added new grievance with ID: {Id}", newId);
                    return newId;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in AddGrievance: {Message}", ex.Message);
                throw;
            }
        }

        public void UpdateGrievance(Grievance grievance)
        {
            try
            {
                using SqlConnection con = new(_connectionString);
                con.Open();
                string query = @"
    UPDATE Grievances 
    SET Title = @Title, 
        Status = @Status, 
        StudentId = @StudentId, 
        CategoryId = @CategoryId,
        Description = @Description,
        LastUpdatedDate = GETDATE()
    WHERE Id = @Id";

                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    cmd.Parameters.AddWithValue("@Id", grievance.Id);
                    cmd.Parameters.AddWithValue("@Title", grievance.Title);
                    cmd.Parameters.AddWithValue("@Status", grievance.Status);
                    cmd.Parameters.AddWithValue("@StudentId", grievance.StudentId);
                    cmd.Parameters.AddWithValue("@CategoryId", grievance.CategoryId);
                    cmd.Parameters.AddWithValue("@Description", grievance.Description ?? (object)DBNull.Value);

                    int rowsAffected = cmd.ExecuteNonQuery();
                    if (rowsAffected == 0)
                    {
                        throw new KeyNotFoundException($"Grievance ID {grievance.Id} not found for update.");
                    }
                    
                    _logger.LogInformation("Updated grievance with ID: {Id}", grievance.Id);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in UpdateGrievance: {Message}", ex.Message);
                throw;
            }
        }



        public void DeleteGrievance(long grievanceId)
        {
            using SqlConnection conn = new(_connectionString);
            conn.Open();
            string query = "DELETE FROM Grievances WHERE Id = @Id";

            using SqlCommand cmd = new(query, conn);
            cmd.Parameters.AddWithValue("@Id", grievanceId);

            int rowsAffected = cmd.ExecuteNonQuery();
            if (rowsAffected == 0)
            {
                throw new KeyNotFoundException($"Grievance ID {grievanceId} not found.");
            }
        }

        public void DeleteGrievanceByKey(int studentId, string title, DateTime createdDate)
        {
            try
            {
                using SqlConnection conn = new(_connectionString);
                conn.Open();
                string query = @"DELETE FROM Grievances 
                                  WHERE StudentId = @StudentId 
                                    AND Title = @Title 
                                    AND CAST(CreatedDate AS date) = CAST(@CreatedDate AS date)";

                using SqlCommand cmd = new(query, conn)
                {
                    Parameters =
                    {
                        new SqlParameter("@StudentId", studentId),
                        new SqlParameter("@Title", title),
                        new SqlParameter("@CreatedDate", createdDate)
                    }
                };

                int rows = cmd.ExecuteNonQuery();
                if (rows == 0)
                {
                    throw new KeyNotFoundException("Grievance not found for provided composite key.");
                }
                
                _logger.LogInformation("Deleted grievance with key: StudentId={StudentId}, Title={Title}, CreatedDate={CreatedDate}", 
                    studentId, title, createdDate);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in DeleteGrievanceByKey: {Message}", ex.Message);
                throw;
            }
        }

        public bool TestConnection()
        {
            try
            {
                using SqlConnection conn = new(_connectionString);
                conn.Open();
                _logger.LogInformation("Database connection test successful");
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Database connection test failed: {Message}", ex.Message);
                return false;
            }
        }
    }
}
