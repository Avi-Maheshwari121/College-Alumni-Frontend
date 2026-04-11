import api from './api';

export const eventService = {
  // Public Route
  getAllEvents: async () => {
    const response = await api.get('/events');
    return response.data;
  },
  
  // Public Route
  getEventById: async (id) => {
    const response = await api.get(`/events/${id}`);
    return response.data;
  },


  createEvent: async (eventData) => {
    const response = await api.post('/events', eventData);
    return response.data;
  }
};