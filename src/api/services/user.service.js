import api from '../axios.config';
import { API_ENDPOINTS } from '../endpoints';

const userService = {
  getAll: () => {
    return api.get(API_ENDPOINTS.USERS);
  },

  getById: (id) => {
    return api.get(API_ENDPOINTS.USER_BY_ID(id));
  },

  delete: (id) => {
    return api.delete(API_ENDPOINTS.USER_BY_ID(id));
  },
};

export default userService;