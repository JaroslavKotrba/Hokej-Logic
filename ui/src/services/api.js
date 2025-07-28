import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// API service functions
export const chatAPI = {
    // Send a message to the chatbot
    sendMessage: async (message, sessionId = '') => {
        try {
            const response = await api.post('/chat', {
                message,
                session_id: sessionId,
            });
            return response.data;
        } catch (error) {
            console.error('Error sending message:', error);
            throw new Error(error.response?.data?.detail || 'Failed to send message');
        }
    },

    // Clear conversation history
    clearConversation: async () => {
        try {
            const response = await api.post('/clear');
            return response.data;
        } catch (error) {
            console.error('Error clearing conversation:', error);
            throw new Error(error.response?.data?.detail || 'Failed to clear conversation');
        }
    },

    // Get health status
    getHealth: async () => {
        try {
            const response = await api.get('/health');
            return response.data;
        } catch (error) {
            console.error('Error getting health status:', error);
            throw new Error('Failed to get health status');
        }
    },
};

export default api; 