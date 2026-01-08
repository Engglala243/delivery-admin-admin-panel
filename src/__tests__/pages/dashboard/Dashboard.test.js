import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../utils/testUtils';
import Dashboard from '../../../pages/dashboard/Dashboard';

const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
}));

describe('Dashboard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading state', () => {
    const initialState = {
      dashboard: {
        stats: {},
        isLoading: true
      }
    };

    const { container } = renderWithProviders(<Dashboard />, { preloadedState: initialState });
    
    expect(container.querySelector('.animate-spin')).toBeInTheDocument();
  });

  test('renders dashboard with stats', () => {
    const initialState = {
      dashboard: {
        stats: {
          totalOrders: 100,
          totalUsers: 50,
          totalProducts: 25,
          totalDrivers: 10,
          recentOrders: []
        },
        isLoading: false
      }
    };

    renderWithProviders(<Dashboard />, { preloadedState: initialState });
    
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Total Orders')).toBeInTheDocument();
    expect(screen.getByText('Total Users')).toBeInTheDocument();
    expect(screen.getByText('Total Products')).toBeInTheDocument();
    expect(screen.getByText('Total Drivers')).toBeInTheDocument();
    expect(screen.getByText('Recent Orders')).toBeInTheDocument();
  });

  test('dispatches fetchDashboardStats on mount', () => {
    const initialState = {
      dashboard: {
        stats: {},
        isLoading: false
      }
    };

    renderWithProviders(<Dashboard />, { preloadedState: initialState });
    
    expect(mockDispatch).toHaveBeenCalledTimes(1);
  });
});