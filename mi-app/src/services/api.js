import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Interceptor para adicionar token nas requisições
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const authService = {
    register: async (userData) => {
        const response = await api.post('/auth/register', userData);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        return response.data;
    },

    login: async (credentials) => {
        const response = await api.post('/auth/login', credentials);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        return response.data;
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },

    getCurrentUser: () => {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    },

    isAuthenticated: () => {
        return !!localStorage.getItem('token');
    }
};

// 🔴 SERVIÇO DE FAVORITOS
export const favoritesService = {
    // Listar todos os favoritos do usuário
    list: async () => {
        const response = await api.get('/favorites');
        return response.data.favorites;
    },
    
    // Adicionar produto aos favoritos
    add: async (productId) => {
        const response = await api.post(`/favorites/${productId}`);
        return response.data;
    },
    
    // Remover produto dos favoritos
    remove: async (productId) => {
        const response = await api.delete(`/favorites/${productId}`);
        return response.data;
    },
    
    // Verificar se produto é favorito
    check: async (productId) => {
        const response = await api.get(`/favorites/check/${productId}`);
        return response.data.isFavorite;
    },
    
    // Sincronizar favoritos (alternar)
    toggle: async (productId, currentStatus) => {
        if (currentStatus) {
            return await favoritesService.remove(productId);
        } else {
            return await favoritesService.add(productId);
        }
    }
};

export default api;