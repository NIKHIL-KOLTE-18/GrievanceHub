// Complaint Service
// This file handles all complaint/grievance-related API calls

import authService from "./authService"

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:9090/api"

class ComplaintService {
  // Get all complaints for current user
  async getUserComplaints(userId) {
    try {
      const response = await fetch(`${API_BASE_URL}/complaints/user/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...authService.getAuthHeaders(),
        },
      })

      if (!response.ok) {
        throw new Error("Failed to fetch complaints")
      }

      return await response.json()
    } catch (error) {
      console.error("Error fetching complaints:", error)
      throw error
    }
  }

  // Submit new complaint
  async submitComplaint(complaintData) {
    try {
      const formData = new FormData()

      // Append complaint data
      Object.keys(complaintData).forEach((key) => {
        if (key !== "file") {
          formData.append(key, complaintData[key])
        }
      })

      // Append file if exists
      if (complaintData.file) {
        formData.append("file", complaintData.file)
      }

      const response = await fetch(`${API_BASE_URL}/complaints`, {
        method: "POST",
        headers: {
          ...authService.getAuthHeaders(),
        },
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to submit complaint")
      }

      return await response.json()
    } catch (error) {
      console.error("Error submitting complaint:", error)
      throw error
    }
  }

  // Update complaint status (Faculty/Admin only)
  async updateComplaintStatus(complaintId, statusData) {
    try {
      const response = await fetch(`${API_BASE_URL}/complaints/${complaintId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...authService.getAuthHeaders(),
        },
        body: JSON.stringify(statusData),
      })

      if (!response.ok) {
        throw new Error("Failed to update complaint status")
      }

      return await response.json()
    } catch (error) {
      console.error("Error updating complaint status:", error)
      throw error
    }
  }

  // Get assigned complaints (Faculty only)
  async getAssignedComplaints(facultyId) {
    try {
      const response = await fetch(`${API_BASE_URL}/complaints/assigned/${facultyId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...authService.getAuthHeaders(),
        },
      })

      if (!response.ok) {
        throw new Error("Failed to fetch assigned complaints")
      }

      return await response.json()
    } catch (error) {
      console.error("Error fetching assigned complaints:", error)
      throw error
    }
  }

  // Get all complaints (Admin only)
  async getAllComplaints(filters = {}) {
    try {
      const queryParams = new URLSearchParams(filters).toString()
      const response = await fetch(`${API_BASE_URL}/complaints/all?${queryParams}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...authService.getAuthHeaders(),
        },
      })

      if (!response.ok) {
        throw new Error("Failed to fetch all complaints")
      }

      return await response.json()
    } catch (error) {
      console.error("Error fetching all complaints:", error)
      throw error
    }
  }

  // Delete complaint
  async deleteComplaint(complaintId) {
    try {
      const response = await fetch(`${API_BASE_URL}/complaints/${complaintId}`, {
        method: "DELETE",
        headers: {
          ...authService.getAuthHeaders(),
        },
      })

      if (!response.ok) {
        throw new Error("Failed to delete complaint")
      }

      return await response.json()
    } catch (error) {
      console.error("Error deleting complaint:", error)
      throw error
    }
  }
}

export default new ComplaintService()
