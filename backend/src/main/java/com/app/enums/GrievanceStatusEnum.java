package com.app.enums;


public enum GrievanceStatusEnum {
    PENDING,          // Default when student submits a grievance
    IN_PROGRESS,      // When faculty starts addressing the issue
    RESOLVED,         // When faculty resolves the grievance
    REJECTED          // If faculty rejects it (optional - based on your rules)
}
