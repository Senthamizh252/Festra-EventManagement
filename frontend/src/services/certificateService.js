import api from './api';

const certificateService = {
  verifyCertificate: async (certId) => {
    const response = await api.get(`/certificates/verify/${certId}`);
    return response.data;
  },

  issueCertificates: async (eventId, criteria) => {
    const response = await api.post('/certificates/issue', { eventId, ...criteria });
    return response.data;
  }
};

export default certificateService;
