import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  register: async (userData: { username: string; email: string; password: string; fullName: string }) => {
    const response = await api.post('/auth/register', userData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  login: async (credentials: { email: string; password: string }) => {
    const response = await api.post('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
  },
};

// Auction API
export const auctionAPI = {
  createAuction: async (auctionData: any) => {
    const response = await api.post('/auctions', auctionData);
    return response.data;
  },

  getAuctions: async (params?: { category?: string; status?: string; search?: string }) => {
    const response = await api.get('/auctions', { params });
    return response.data;
  },

  getAuctionById: async (id: string) => {
    const response = await api.get(`/auctions/${id}`);
    return response.data;
  },

  placeBid: async (auctionId: string, amount: number) => {
    const response = await api.post(`/auctions/${auctionId}/bids`, { amount });
    return response.data;
  },
};

export default api; 