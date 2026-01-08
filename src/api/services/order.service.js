import api from '../axios.config';
import { API_ENDPOINTS } from '../endpoints';

const orderService = {
  getAll: () => {
    return api.get(API_ENDPOINTS.ORDERS);
  },

  updateStatus: (id, status) => {
    return api.put(API_ENDPOINTS.ORDER_STATUS(id), { status });
  },

  getById: (id) => {
    return api.get(API_ENDPOINTS.ORDER_BY_ID(id));
  },
};

export default orderService;