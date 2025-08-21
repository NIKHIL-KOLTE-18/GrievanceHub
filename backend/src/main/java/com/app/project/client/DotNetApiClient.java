package com.app.project.client;

import com.app.dto.WrapperDTO;
import com.app.project.dto.GrievanceStatsDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Component
public class DotNetApiClient {

    @Autowired
    private RestTemplate restTemplate;

    private final String baseUrl = "http://localhost:5120/api/analytics";

    public GrievanceStatsDTO getGrievanceStats() {
        String statusUrl = baseUrl + "/status";
        String totalUrl = baseUrl + "/total";

        Map<String, Integer> statusMap = restTemplate.getForObject(statusUrl, Map.class);

        GrievanceStatsDTO stats = new GrievanceStatsDTO();
        if (statusMap != null) {
            // Map .NET response to our DTO
            // Try various casing keys to be resilient
            stats.setOpenGrievances(statusMap.getOrDefault("Open", statusMap.getOrDefault("OPEN", 0)));
            stats.setPendingGrievances(statusMap.getOrDefault("Pending", statusMap.getOrDefault("PENDING", 0)));
            stats.setClosedGrievances(statusMap.getOrDefault("Resolved", statusMap.getOrDefault("RESOLVED", 0)));
        }

        Integer total = restTemplate.getForObject(totalUrl, Integer.class);
        stats.setTotalGrievances(total != null ? total : 0);

        System.out.println("Analytics from .NET - Open: " + stats.getOpenGrievances() + 
                          ", Pending: " + stats.getPendingGrievances() + 
                          ", Closed: " + stats.getClosedGrievances() + 
                          ", Total: " + stats.getTotalGrievances());

        return stats;
    }

    /**
     * Sync new grievance to .NET and return the remote ID assigned by .NET API
     */
    public Long syncNewGrievanceAndGetRemoteId(WrapperDTO wrapperDTO) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<WrapperDTO> request = new HttpEntity<>(wrapperDTO, headers);

        try {
            ResponseEntity<Map> response = restTemplate.postForEntity(
                    baseUrl + "/grievances",
                    request,
                    Map.class
            );

            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                Map body = response.getBody();
                Object idObj = body.get("Id"); // prefer exact match
                if (idObj == null) {
                    idObj = body.get("id"); // System.Text.Json defaults to camelCase => "id"
                }
                if (idObj == null) {
                    idObj = body.get("ID"); // extra safety
                }

                if (idObj != null) {
                    try {
                        return Long.parseLong(idObj.toString());
                    } catch (NumberFormatException e) {
                        System.err.println("Invalid ID format from .NET: " + idObj);
                    }
                } else {
                    try {
                        System.err.println("ID not found in .NET response body keys: " + body.keySet());
                    } catch (Exception ignore) { /* ignore logging failures */ }
                }
            } else {
                System.err.println("Non-2xx response from .NET: " + response.getStatusCode());
            }
        } catch (Exception e) {
            System.err.println("Failed to sync grievance to .NET: " + e.getMessage());
        }

        return null; // Fallback if something went wrong
    }

    public void deleteGrievance(Long grievanceId) {
        String url = baseUrl + "/" + grievanceId;
        System.out.println("Sending DELETE request to URL: " + url);

        try {
            restTemplate.delete(url);
            System.out.println("Deleted grievance with id " + grievanceId + " on .NET side.");
        } catch (Exception e) {
            System.err.println("Failed to sync grievance deletion to .NET: " + e.getMessage());
        }
    }

    public void deleteGrievanceByKey(long studentId, String title, java.time.LocalDate submittedDate) {
        String url = baseUrl + "/by-key";
        System.out.println("Sending composite-key DELETE to: " + url);

        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            java.util.Map<String, Object> body = new java.util.HashMap<>();
            body.put("studentId", studentId);
            body.put("title", title);
            // Pass ISO date. .NET side casts to date
            body.put("createdDate", java.sql.Date.valueOf(submittedDate));

            HttpEntity<java.util.Map<String, Object>> request = new HttpEntity<>(body, headers);
            restTemplate.exchange(url, HttpMethod.DELETE, request, Void.class);
            System.out.println("Composite-key delete sent to .NET.");
        } catch (Exception e) {
            System.err.println("Failed composite-key delete to .NET: " + e.getMessage());
        }
    }

    /**
     * Send grievance to .NET without expecting an ID back
     */
    public void syncNewGrievance(WrapperDTO wrapper) {
        String url = baseUrl + "/grievances";

        try {
            restTemplate.postForEntity(url, wrapper, Void.class);
            System.out.println("Grievance successfully synced to .NET.");
        } catch (Exception e) {
            System.err.println("Error syncing grievance to .NET: " + e.getMessage());
        }
    }

    /**
     * Update existing grievance in .NET service
     */
    public void syncGrievanceUpdateToDotNet(WrapperDTO wrapper, Long remoteId) {
        String url = baseUrl + "/grievances/" + remoteId;

        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<WrapperDTO> request = new HttpEntity<>(wrapper, headers);
            restTemplate.exchange(url, HttpMethod.PUT, request, Void.class);
            System.out.println("Grievance update successfully synced to .NET with remote ID: " + remoteId);
        } catch (Exception e) {
            System.err.println("Error syncing grievance update to .NET: " + e.getMessage());
        }
    }
}
