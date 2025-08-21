import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:9090/api";

const getFacultyProfile = (facultyId, token) => {
  return axios.get(`${API_URL}/faculties/${facultyId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const updateFacultyProfile = (facultyId, data, token) => {
  return axios.put(`${API_URL}/faculties/${facultyId}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export default {
  getFacultyProfile,
  updateFacultyProfile,
};
