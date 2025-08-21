//This DTO (Data Transfer Object) is used only for sending custom/statistical data to the frontend
//not for storing in the DB
namespace GrievanceAnalyticsService.DTOs
{
    public class GrievanceStatsDTO
    {       
        public int TotalGrievances { get; set; }
        public int Open { get; set; }
        public int Pending { get; set; }
        public int Resolved { get; set; }
    }
}
