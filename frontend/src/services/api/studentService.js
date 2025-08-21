import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:9090/api';

// Create axios instance with auth token
const createAxiosInstance = () => {
  const token = localStorage.getItem('authToken'); // Fixed: was 'token', should be 'authToken'
  return axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
};

const studentService = {
  // Get student profile
  getStudentProfile: async (studentId) => {
    try {
      const response = await createAxiosInstance().get(`/students/${studentId}/profile`);
      return response.data;
    } catch (error) {
      console.error('Error in getStudentProfile:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
      }
      throw error;
    }
  },

  // Update student profile
  updateStudentProfile: async (studentId, profileData) => {
    try {
      // If profileData is FormData (for image upload), set Content-Type to multipart/form-data
      const token = localStorage.getItem('authToken');
      let headers = {
        'Authorization': `Bearer ${token}`
      };
      if (profileData instanceof FormData) {
        headers['Content-Type'] = 'multipart/form-data';
      } else {
        headers['Content-Type'] = 'application/json';
      }
      const response = await axios.put(
        `${API_BASE_URL}/students/${studentId}/profile`,
        profileData,
        { headers }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update student password
  updateStudentPassword: async (studentId, passwordData) => {
    try {
      const response = await createAxiosInstance().put(`/students/${studentId}/password`, passwordData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get student grievances
  getStudentGrievances: async (studentId) => {
    try {
      const response = await createAxiosInstance().get(`/students/${studentId}/grievances`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get specific grievance by ID
  getStudentGrievanceById: async (studentId, grievanceId) => {
    try {
      const response = await createAxiosInstance().get(`/students/${studentId}/grievances/${grievanceId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default studentService;
