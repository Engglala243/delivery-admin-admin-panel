import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders, mockUser } from '../../utils/testUtils';
import UserForm from '../../../components/users/UserForm';

const mockOnClose = jest.fn();

describe('UserForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders form fields correctly', () => {
    renderWithProviders(<UserForm onClose={mockOnClose} />);
    
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Phone')).toBeInTheDocument();
    expect(screen.getByText('Street')).toBeInTheDocument();
    expect(screen.getByText('City')).toBeInTheDocument();
    expect(screen.getByText('State')).toBeInTheDocument();
    expect(screen.getByText('Zip Code')).toBeInTheDocument();
  });

  test('populates form when editing user', () => {
    renderWithProviders(<UserForm user={mockUser} onClose={mockOnClose} />);
    
    expect(screen.getByDisplayValue(mockUser.name)).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockUser.email)).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockUser.phone)).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockUser.address.street)).toBeInTheDocument();
  });

  test('calls onClose when cancel button is clicked', () => {
    renderWithProviders(<UserForm onClose={mockOnClose} />);
    
    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    fireEvent.click(cancelButton);
    
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});