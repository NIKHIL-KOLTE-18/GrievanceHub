//WHY CONTROLLER: controller receives HTTP requests, delegates work to the service, and returns results with proper status codes.

using GrievanceAnalyticsService.DTOs;
using GrievanceAnalyticsService.Entities;
using GrievanceAnalyticsService.Services;
using GrievanceAnalyticsService.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace AnalyticsMicroservice.Controllers
{
    [ApiController]
    [Route("api/[controller]")]//Sets the base URL for all endpoints in this controller.
//ControllerBase is for APIs (no Views, just JSON data) so we not used Controller its for MVC 
    public class AnalyticsController : ControllerBase
    {
        private readonly IAnalyticsService analyticsServices;
        private readonly IAnalyticsRepository analyticsRepository;

        public AnalyticsController(IAnalyticsService analyticsService, IAnalyticsRepository analyticsRepository)
        {
            analyticsServices = analyticsService;
            this.analyticsRepository = analyticsRepository;
        }

        // GET: api/analytics/total
        [HttpGet("total")]//Maps this method to an HTTP GET request with the endpoint /total.
        public IActionResult GetTotalGrievances()
        {
            int totalGrievances = analyticsServices.GetTotalGrievances();
            //return Ok(new { totalGrievances = total });
            return Ok(totalGrievances);
           
        }

        // GET: api/analytics/status
        [HttpGet("status")]//
 //IActionResult : standard return type for API actions that can represent any HTTP status (200 OK, 404 Not Found etc)
        public IActionResult GetGrievancesByStatus()//
        {
            var statusCounts = analyticsServices.GetGrievancesByStatus();
            return Ok(statusCounts);
        }



        [HttpPost("grievances")]
        public IActionResult AddGrievance([FromBody] GrievanceWrapper wrapper)
        {
            if (wrapper?.Grievance == null)
                return BadRequest("Grievance data is required");

            int newId = analyticsServices.AddGrievance(wrapper.Grievance);
            return Ok(new { Id = newId, Message = "Grievance added successfully" });
        }

        [HttpPut("grievances/{id}")]
        public IActionResult UpdateGrievance(long id, [FromBody] GrievanceWrapper wrapper)
        {
            if (wrapper?.Grievance == null)
                return BadRequest("Grievance data is required");

            if (wrapper.Grievance.Id != id)
                return BadRequest("Grievance ID in path does not match ID in body");

            try
            {
                analyticsServices.UpdateGrievance(wrapper.Grievance);
                return Ok(new { Message = "Grievance updated successfully" });
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { Error = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Error = "Internal server error", Details = ex.Message });
            }
        }


        [HttpDelete("{id}")]
        public IActionResult DeleteGrievance(long id)
        {
            try
            {
                analyticsServices.DeleteGrievance(id);
            }
            catch (KeyNotFoundException)
            {
                Console.WriteLine($"Grievance ID {id} not found during deletion.");
                // Optional: return 204 anyway to keep sync flow smooth
            }

            return NoContent(); // Always return 204
        }

        // Fallback delete without remote id
        [HttpDelete("by-key")]
        public IActionResult DeleteGrievanceByKey([FromBody] GrievanceDeleteKeyDto key)
        {
            try
            {
                analyticsServices.DeleteGrievanceByKey(key.StudentId, key.Title, key.CreatedDate);
            }
            catch (KeyNotFoundException)
            {
                Console.WriteLine("Grievance not found for composite key delete.");
            }
            return NoContent();
        }

        [HttpGet("health")]
        public IActionResult HealthCheck()
        {
            try
            {
                bool dbConnection = analyticsRepository.TestConnection();
                var stats = analyticsServices.GetGrievanceStatistics();
                
                return Ok(new
                {
                    Status = "Healthy",
                    DatabaseConnection = dbConnection ? "Connected" : "Failed",
                    Timestamp = DateTime.UtcNow,
                    GrievanceStats = stats
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    Status = "Unhealthy",
                    Error = ex.Message,
                    Timestamp = DateTime.UtcNow
                });
            }
        }
    }
}
