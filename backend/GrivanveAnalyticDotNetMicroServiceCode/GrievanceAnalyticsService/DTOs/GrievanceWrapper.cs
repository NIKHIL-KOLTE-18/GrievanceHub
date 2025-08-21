using System.Text.Json.Serialization;
using GrievanceAnalyticsService.Entities;

public class GrievanceWrapper
{
    [JsonPropertyName("Grievance")] //  Match exact casing
    public Grievance Grievance { get; set; }
}
