// User Service
// This file handles all user management API calls

import authService from "./authService"

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:9090/api"

class UserService {
  // Get user profile
  async getUserProfile(userId) {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...authService.getAuthHeaders(),
        },
      })

      if (!response.ok) {
        throw new Error("Failed to fetch user profile")
      }

      return await response.json()
    } catch (error) {
      console.error("Error fetching user profile:", error)
      throw error
    }
  }

  // Update user profile
  async updateUserProfile(userId, profileData) {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...authService.getAuthHeaders(),
        },
        body: JSON.stringify(profileData),
      })

      if (!response.ok) {
        throw new Error("Failed to update user profile")
      }

      return await response.json()
    } catch (error) {
      console.error("Error updating user profile:", error)
      throw error
    }
  }

  // Change password
  async changePassword(passwordData) {
    try {
      const response = await fetch(`${API_BASE_URL}/users/change-password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...authService.getAuthHeaders(),
        },
        body: JSON.stringify(passwordData),
      })

      if (!response.ok) {
        throw new Error("Failed to change password")
      }

      return await response.json()
    } catch (error) {
      console.error("Error changing password:", error)
      throw error
    }
  }

  // Get all users (Admin only)
  async getAllUsers(filters = {}) {
    try {
      const queryParams = new URLSearchParams(filters).toString()
      const response = await fetch(`${API_BASE_URL}/users?${queryParams}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...authService.getAuthHeaders(),
        },
      })

      if (!response.ok) {
        throw new Error("Failed to fetch users")
      }

      return await response.json()
    } catch (error) {
      console.error("Error fetching users:", error)
      throw error
    }
  }

  // Approve user registration (Admin only)
  async approveUser(userId) {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${userId}/approve`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...authService.getAuthHeaders(),
        },
      })

      if (!response.ok) {
        throw new Error("Failed to approve user")
      }

      return await response.json()
    } catch (error) {
      console.error("Error approving user:", error)
      throw error
    }
  }

  // Reject user registration (Admin only)
  async rejectUser(userId) {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${userId}/reject`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...authService.getAuthHeaders(),
        },
      })

      if (!response.ok) {
        throw new Error("Failed to reject user")
      }

      return await response.json()
    } catch (error) {
      console.error("Error rejecting user:", error)
      throw error
    }
  }

  // Deactivate user (Admin only)
  async deactivateUser(userId) {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${userId}/deactivate`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...authService.getAuthHeaders(),
        },
      })

      if (!response.ok) {
        throw new Error("Failed to deactivate user")
      }

      return await response.json()
    } catch (error) {
      console.error("Error deactivating user:", error)
      throw error
    }
  }
}

export default new UserService()
