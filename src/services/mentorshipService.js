import api from "./api";

export const mentorshipService = {
  // Public
  getAllMentors: async () => {
    const response = await api.get("/mentorship");
    return response.data.data || [];
  },

  getMentorById: async (id) => {
    const response = await api.get(`/mentorship/${id}`);
    return response.data.data;
  },

  // --- NEW: Dashboard Flow (Direct User Model Updates) ---
  registerMentor: async (data) => {
    const response = await api.post("/mentorship/register", data);
    return response.data;
  },

  getMyDashboard: async () => {
    const response = await api.get("/mentorship/me");
    return response.data;
  },

  // --- OLD: Legacy Service Flow (Preserved for compatibility) ---
  createMentorship: async (data) => {
    const response = await api.post("/mentorship", data);
    return response.data;
  },
  getMyProfile: async () => {
    const response = await api.get("/mentorship/me/profile");
    return response.data;
  },
  updateMentorship: async (id, data) => {
    const response = await api.put(`/mentorship/${id}`, data);
    return response.data;
  },
  deleteMentorship: async (id) => {
    const response = await api.delete(`/mentorship/${id}`);
    return response.data;
  },
  updateStatus: async (id, status) => {
    const response = await api.patch(`/mentorship/${id}/status`, { status });
    return response.data;
  },
};