//we use interface : it Helps in loose coupling, unit testing, and dependency injection.
//It defines what should be done, not how.
using GrievanceAnalyticsService.DTOs;
using GrievanceAnalyticsService.Entities;

namespace GrievanceAnalyticsService.Services
{
    public interface IAnalyticsService
    {
        GrievanceStatsDTO GetGrievanceStatistics();
        int GetTotalGrievances();
        Dictionary<string, int> GetGrievancesByStatus();

        int AddGrievance(Grievance grievance);

        void UpdateGrievance(Grievance grievance);

        void DeleteGrievance(long grievanceId);

        void DeleteGrievanceByKey(int studentId, string title, DateTime createdDate);

    }
}
