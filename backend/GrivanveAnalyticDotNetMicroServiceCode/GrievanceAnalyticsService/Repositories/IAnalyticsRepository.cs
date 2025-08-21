using GrievanceAnalyticsService.DTOs;
using GrievanceAnalyticsService.Entities;

namespace GrievanceAnalyticsService.Repositories
{
    public interface IAnalyticsRepository
    {
        GrievanceStatsDTO GetGrievanceStats();
        int GetTotalGrievances();
        Dictionary<string, int> GetGrievancesByStatus();
        int AddGrievance(Grievance grievance);
        void UpdateGrievance(Grievance grievance);
        void DeleteGrievance(long grievanceId);
        void DeleteGrievanceByKey(int studentId, string title, DateTime createdDate);
        bool TestConnection();
    }
}
