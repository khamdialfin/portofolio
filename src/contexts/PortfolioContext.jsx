// src/contexts/PortfolioContext.jsx
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { fetchPortfolioData, DEFAULT_PORTFOLIO } from '../services/portfolioService';

const PortfolioContext = createContext(null);

export const PortfolioProvider = ({ children }) => {
  const [portfolio, setPortfolio] = useState(DEFAULT_PORTFOLIO);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return Boolean(localStorage.getItem('portfolio_admin_token'));
  });

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchPortfolioData();
      if (data) {
        setPortfolio(data);
        setError(null);
      }
    } catch (err) {
      console.warn('Error loading portfolio data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const login = (token) => {
    localStorage.setItem('portfolio_admin_token', token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('portfolio_admin_token');
    setIsAuthenticated(false);
  };

  return (
    <PortfolioContext.Provider
      value={{
        portfolio,
        setPortfolio,
        loading,
        error,
        refreshPortfolio: loadData,
        isAdminOpen,
        setIsAdminOpen,
        isAuthenticated,
        login,
        logout
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
