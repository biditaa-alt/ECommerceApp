import axios from 'axios';
import mockProducts from './mockProducts';

const BASE_URL = 'https://dummyjson.com';

export const fetchProducts = async () => {
  try {
    const { data } = await axios.get(`${BASE_URL}/products`, {
      timeout: 8000,
      headers: { Accept: 'application/json' },
    });
    return data.products || [];
  } catch (_networkError) {
    
    return mockProducts;
  }
};
