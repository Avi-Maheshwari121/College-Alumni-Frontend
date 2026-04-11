import api from './api';

export const mentorshipService = {
  getAllMentors: async () => {
    const response = await api.get('/mentorship');
    return response.data;
  },
  
  getMentorById: async (id) => {
    const response = await api.get(`/mentorship/${id}`);
    return response.data;
  },

  createMentorship: async (data) => {
    const response = await api.post('/mentorship', data);
    return response.data;
  }
};