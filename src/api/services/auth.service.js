import api from '../axios.config';
import { API_ENDPOINTS } from '../endpoints';

const authService = {
  login: (credentials) => {
    return api.post(API_ENDPOINTS.LOGIN, credentials);
  },

  getProfile: () => {
    return api.get(API_ENDPOINTS.PROFILE);
  },
};

export default authService;