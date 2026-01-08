import api from '../axios.config';
import { API_ENDPOINTS } from '../endpoints';

const categoryService = {
  getAll: () => {
    return api.get(API_ENDPOINTS.CATEGORIES);
  },

  create: (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    if (data.image) {
      formData.append('image', data.image);
    }
    
    return api.post(API_ENDPOINTS.CATEGORIES, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  update: (id, data) => {
    return api.put(API_ENDPOINTS.CATEGORY_BY_ID(id), data);
  },

  delete: (id) => {
    return api.delete(API_ENDPOINTS.CATEGORY_BY_ID(id));
  },
};

export default categoryService;