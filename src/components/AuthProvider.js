import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

// Create AuthContext 
const AuthContext = createContext(null);

// AuthProvider Component 
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));

    // Axios instance with interceptor 
    const axiosInstance = axios.create({
        baseURL: 'http://localhost:3000',
    });

    // Request interceptor for adding token 
    axiosInstance.interceptors.request.use(
        (config) => {
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    // Response interceptor for handling token refresh 
    axiosInstance.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;

            // If token is expired and we haven't already tried to refresh 
            if (error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;

                try {
                    const refreshResponse = await axiosInstance.post('/refresh-token');
                    const newToken = refreshResponse.data.token;

                    // Update token in state and local storage 
                    setToken(newToken);
                    localStorage.setItem('token', newToken);

                    // Retry the original request with new token 
                    originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
                    return axiosInstance(originalRequest);
                } catch (refreshError) {
                    // Logout if refresh fails 
                    logout();
                    return Promise.reject(refreshError);
                }
            }

            return Promise.reject(error);
        }
    );

    // Login function 
    const login = async (email, password) => {
        try {
            const response = await axiosInstance.post('/login', { email, password });
            const { token, user } = response.data;

            // Set token and user 
            setToken(token);
            setUser(user);

            // Store token in local storage 
            localStorage.setItem('token', token);

            return user;
        } catch (error) {
            console.error('Login failed', error);
            throw error;
        }
    };

    // Logout function 
    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
    };

    // Check auth on component mount 
    useEffect(() => {
        const checkAuth = async () => {
            if (token) {
                try {
                    const response = await axiosInstance.get('/protected');
                    setUser(response.data.user);
                } catch (error) {
                    logout();
                }
            }
        };

        checkAuth();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                login,
                logout,
                axiosInstance
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook for using auth context 
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

// Protected Route Component 
export const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();

    if (!user) {
        // Redirect to login or show unauthorized message 
        return <Navigate to="/login" replace />;
    }

    return children;
};