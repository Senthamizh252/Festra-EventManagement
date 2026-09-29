import api from './api';

const checkInService = {
  scanCheckIn: async (payload) => {
    const response = await api.post('/checkin/verify', payload);
    return response.data;
  },

  getEventStats: async (eventId) => {
    const response = await api.get(`/checkin/stats/${eventId}`);
    return response.data;
  }
};

export default checkInService;
