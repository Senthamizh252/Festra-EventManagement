import api from './api';

const eventService = {
  getEvents: async (params) => {
    const response = await api.get('/events', { params });
    return response.data;
  },

  getEventById: async (id) => {
    const response = await api.get(`/events/${id}`);
    return response.data;
  },

  createEvent: async (eventData) => {
    const response = await api.post('/events', eventData);
    return response.data;
  },

  registerEvent: async (eventId, teamData) => {
    const response = await api.post('/registrations', { eventId, ...teamData });
    return response.data;
  },

  getMyRegistrations: async () => {
    const response = await api.get('/registrations/my-passes');
    return response.data;
  }
};

export default eventService;
