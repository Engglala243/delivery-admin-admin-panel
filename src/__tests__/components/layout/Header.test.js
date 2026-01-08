import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../../utils/testUtils';
import Header from '../../../components/layout/Header';

const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
}));

describe('Header', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders with user information', () => {
    const initialState = {
      auth: {
        user: {
          name: 'John Admin',
          email: 'john@admin.com'
        }
      }
    };

    renderWithProviders(<Header />, { preloadedState: initialState });
    
    expect(screen.getByText('Welcome back, John Admin!')).toBeInTheDocument();
    expect(screen.getByText('john@admin.com')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  test('renders with default admin name when user name is not available', () => {
    const initialState = {
      auth: {
        user: {
          email: 'admin@example.com'
        }
      }
    };

    renderWithProviders(<Header />, { preloadedState: initialState });
    
    expect(screen.getByText('Welcome back, Admin!')).toBeInTheDocument();
  });

  test('calls logout when logout button is clicked', () => {
    const initialState = {
      auth: {
        user: {
          name: 'John Admin',
          email: 'john@admin.com'
        }
      }
    };

    renderWithProviders(<Header />, { preloadedState: initialState });
    
    const logoutButton = screen.getByRole('button', { name: /logout/i });
    fireEvent.click(logoutButton);
    
    expect(mockDispatch).toHaveBeenCalledTimes(1);
  });
});