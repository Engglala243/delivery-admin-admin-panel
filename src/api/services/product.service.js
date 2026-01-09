import api from '../axios.config';
import { API_ENDPOINTS } from '../endpoints';

const productService = {
  getAll: () => {
    return api.get(API_ENDPOINTS.PRODUCTS);
  },

  create: (data) => {
    return api.post(API_ENDPOINTS.PRODUCTS, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  update: (id, data) => {
    const config = {};
    if (data instanceof FormData) {
      config.headers = {
        'Content-Type': 'multipart/form-data',
      };
    }
    return api.put(API_ENDPOINTS.PRODUCT_BY_ID(id), data, config);
  },

  delete: (id) => {
    return api.delete(API_ENDPOINTS.PRODUCT_BY_ID(id));
  },
};

export default productService;