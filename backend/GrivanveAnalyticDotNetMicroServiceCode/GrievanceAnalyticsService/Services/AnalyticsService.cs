using GrievanceAnalyticsService.DTOs;
using GrievanceAnalyticsService.Entities;
using GrievanceAnalyticsService.Repositories;
using GrievanceAnalyticsService.Services;

public class AnalyticsService : IAnalyticsService
{
    private readonly IAnalyticsRepository _repository;
   

    public AnalyticsService(IAnalyticsRepository repository)
    {
        _repository = repository;
    }

    public GrievanceStatsDTO GetGrievanceStatistics()
    {
        return _repository.GetGrievanceStats();
    }

    public int GetTotalGrievances()
    {
        return _repository.GetTotalGrievances();
    }

    public Dictionary<string, int> GetGrievancesByStatus()
    {
        return _repository.GetGrievancesByStatus();
    }

    public int AddGrievance(Grievance grievance)
    {
      return  _repository.AddGrievance(grievance);
    }

    public void UpdateGrievance(Grievance grievance)
    {
        _repository.UpdateGrievance(grievance);
    }

    public void DeleteGrievance(long grievanceId)
    {
        _repository.DeleteGrievance(grievanceId);
    }

    public void DeleteGrievanceByKey(int studentId, string title, DateTime createdDate)
    {
        _repository.DeleteGrievanceByKey(studentId, title, createdDate);
    }



}
