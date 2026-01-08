import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { renderWithProviders } from '../utils/testUtils';
import Login from '../../pages/auth/Login';

jest.mock('../../api/services/auth.service', () => ({
  login: jest.fn(),
}));

describe('Login Integration', () => {
  test('successful login flow', async () => {
    const authService = require('../../api/services/auth.service');
    authService.login.mockResolvedValue({
      data: {
        token: 'fake-token',
        admin: { id: '1', name: 'Admin', email: 'admin@example.com' }
      }
    });

    renderWithProviders(<Login />);
    
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole('button', { name: /sign in/i });
    
    fireEvent.change(emailInput, { target: { value: 'admin@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);
    
    await waitFor(() => {
      expect(authService.login).toHaveBeenCalledWith({
        email: 'admin@example.com',
        password: 'password123'
      });
    });
  });
});