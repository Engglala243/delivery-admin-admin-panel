import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../utils/testUtils';
import RecentOrders from '../../../components/dashboard/RecentOrders';

describe('RecentOrders', () => {
  const mockOrders = [
    {
      _id: '1',
      orderNumber: 'ORD001',
      user: { name: 'John Doe' },
      totalAmount: 25.99,
      status: 'pending',
      createdAt: '2024-01-15T10:00:00Z'
    },
    {
      _id: '2',
      orderNumber: 'ORD002',
      user: { name: 'Jane Smith' },
      totalAmount: 45.50,
      status: 'delivered',
      createdAt: '2024-01-14T15:30:00Z'
    }
  ];

  test('renders orders list correctly', () => {
    renderWithProviders(<RecentOrders orders={mockOrders} />);
    
    expect(screen.getByText('ORD001')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('ORD002')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('pending')).toBeInTheDocument();
    expect(screen.getByText('delivered')).toBeInTheDocument();
  });

  test('renders empty state when no orders', () => {
    renderWithProviders(<RecentOrders orders={[]} />);
    
    expect(screen.getByText(/no recent orders/i)).toBeInTheDocument();
  });

  test('renders loading state when orders is undefined', () => {
    renderWithProviders(<RecentOrders />);
    
    expect(screen.getByText(/no recent orders/i)).toBeInTheDocument();
  });
});