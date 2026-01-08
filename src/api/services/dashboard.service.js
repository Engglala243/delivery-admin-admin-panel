import api from '../axios.config';
import { API_ENDPOINTS } from '../endpoints';

const dashboardService = {
  getStats: () => {
    return api.get(API_ENDPOINTS.DASHBOARD_STATS);
  },
};

export default dashboardService;