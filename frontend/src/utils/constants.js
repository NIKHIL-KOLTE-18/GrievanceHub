// Application Constants

export const USER_ROLES = {
  STUDENT: "student",
  FACULTY: "faculty",
  ADMIN: "admin",
}

export const COMPLAINT_STATUS = {
  PENDING: "Pending",
  IN_PROGRESS: "In Progress",
  RESOLVED: "Resolved",
  REJECTED: "Rejected",
}

export const COMPLAINT_CATEGORIES = ["Academic", "Administrative", "Behavioral", "Infrastructure", "Other"]

export const DEPARTMENTS = [
  "Computer Science",
  "Information Technology",
  "Electronics",
  "Mechanical",
  "Civil",
  "Electrical",
  "Chemical",
]

export const PRIORITY_LEVELS = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
}

export const LOCAL_STORAGE_KEYS = {
  AUTH_TOKEN: "authToken",
  USER_ROLE: "userRole",
  USER_ID: "userId",
}

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
  },
  USERS: {
    PROFILE: "/users",
    CHANGE_PASSWORD: "/users/change-password",
    APPROVE: "/users/:id/approve",
    REJECT: "/users/:id/reject",
    DEACTIVATE: "/users/:id/deactivate",
  },
  COMPLAINTS: {
    BASE: "/complaints",
    USER_COMPLAINTS: "/complaints/user/:userId",
    ASSIGNED: "/complaints/assigned/:facultyId",
    STATUS: "/complaints/:id/status",
  },
}
