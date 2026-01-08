import api from '../axios.config';
import { API_ENDPOINTS } from '../endpoints';

const driverService = {
  getAll: () => {
    return api.get(API_ENDPOINTS.DRIVERS);
  },

  create: (data) => {
    return api.post(API_ENDPOINTS.DRIVERS, data);
  },

  getById: (id) => {
    return api.get(API_ENDPOINTS.DRIVER_BY_ID(id));
  },
};

export default driverService;