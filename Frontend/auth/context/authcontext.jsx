import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { login as loginService, register as registerService } from '../services/auth';

// 1. Buat Context
const AuthContext = createContext();

// 2. Buat Reducer untuk mengelola state autentikasi
const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
    case 'REGISTER_START':
      return { ...state, isLoading: true, isError: false, message: '' };
    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload.user,
        token: action.payload.token,
        isError: false,
        message: '',
      };
    case 'LOGIN_FAIL':
    case 'REGISTER_FAIL':
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
        user: null,
        token: null,
        isError: true,
        message: action.payload,
      };
    case 'LOGOUT':
      localStorage.removeItem('token');
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
      };
    case 'AUTH_LOADED':
        return {
            ...state,
            isAuthenticated: true,
            user: action.payload.user,
            token: action.payload.token,
            isLoading: false,
        }
    default:
      return state;
  }
};

// 3. Buat Provider Component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    isAuthenticated: false,
    isLoading: true, // Mulai dengan true untuk cek token awal
    user: null,
    token: localStorage.getItem('token'),
    isError: false,
    message: '',
  });

  // Cek token saat aplikasi dimuat
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
        // Di aplikasi nyata, Anda akan memverifikasi token ke backend
        // Di sini kita anggap token valid dan buat user dummy
        const user = { id: 1, username: 'admin' }; // Seharusnya di-decode dari token
        dispatch({ type: 'AUTH_LOADED', payload: { user, token } });
    } else {
        dispatch({ type: 'LOGIN_FAIL', payload: 'No token found' });
    }
  }, []);

  const login = async (username, password) => {
    try {
      dispatch({ type: 'LOGIN_START' });
      const data = await loginService(username, password);
      dispatch({ type: 'LOGIN_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'LOGIN_FAIL', payload: error.message });
    }
  };

  const register = async (username, password) => {
    try {
      dispatch({ type: 'REGISTER_START' });
      const data = await registerService(username, password);
      dispatch({ type: 'REGISTER_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'REGISTER_FAIL', payload: error.message });
    }
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 4. Buat custom hook untuk mudah mengakses context
export const useAuth = () => {
  return useContext(AuthContext);
};