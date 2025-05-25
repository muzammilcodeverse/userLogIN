import { createContext, useState, useEffect, useContext } from 'react';
import { loginUser, registerUser, getCurrentUser, logoutUser, updateUser } from '../utils/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const checkLoggedIn = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const userData = await getCurrentUser();
          setUser(userData.data);
          setIsAuthenticated(true);
        }
      } catch (error) {
        localStorage.removeItem('token');
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkLoggedIn();
  }, []);

  // Register user
  const register = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await registerUser(userData);
      localStorage.setItem('token', response.token);
      setUser(response.user);
      setIsAuthenticated(true);
      return response;
    } catch (error) {
      setError(error.error || 'Registration failed');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Login user
  const login = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await loginUser(userData);
      localStorage.setItem('token', response.token);
      setUser(response.user);
      setIsAuthenticated(true);
      return response;
    } catch (error) {
      setError(error.error || 'Login failed');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout user
  const logout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token');
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  // Update user profile
  const updateProfile = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await updateUser(user.id, userData);
      setUser(response.data);
      return response;
    } catch (error) {
      setError(error.error || 'Update failed');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        error,
        register,
        login,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);

export default AuthContext;
