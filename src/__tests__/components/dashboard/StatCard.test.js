import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../utils/testUtils';
import StatCard from '../../../components/dashboard/StatCard';
import { UsersIcon } from '@heroicons/react/24/outline';

describe('StatCard', () => {
  const defaultProps = {
    title: 'Total Users',
    value: 150,
    icon: UsersIcon,
    color: 'bg-blue-500',
  };

  test('renders stat card with correct data', () => {
    renderWithProviders(<StatCard {...defaultProps} />);
    
    expect(screen.getByText('Total Users')).toBeInTheDocument();
    expect(screen.getByText('150')).toBeInTheDocument();
  });

  test('renders with zero value when value is not provided', () => {
    renderWithProviders(<StatCard {...defaultProps} value={undefined} />);
    
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  test('renders with null value', () => {
    renderWithProviders(<StatCard {...defaultProps} value={null} />);
    
    expect(screen.getByText('0')).toBeInTheDocument();
  });
});