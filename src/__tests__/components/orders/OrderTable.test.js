import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders, mockOrder } from '../../utils/testUtils';
import OrderTable from '../../../components/orders/OrderTable';

const mockOnView = jest.fn();
const mockOnStatusUpdate = jest.fn();

describe('OrderTable', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('displays orders data correctly', () => {
    const orders = [mockOrder];
    renderWithProviders(
      <OrderTable 
        orders={orders} 
        loading={false} 
        onView={mockOnView} 
        onStatusUpdate={mockOnStatusUpdate} 
      />
    );
    
    expect(screen.getByText(mockOrder.orderNumber)).toBeInTheDocument();
    expect(screen.getByText(mockOrder.user.name)).toBeInTheDocument();
    expect(screen.getByText(`$${mockOrder.totalAmount.toFixed(2)}`)).toBeInTheDocument();
  });

  test('calls onView when view details button is clicked', () => {
    const orders = [mockOrder];
    renderWithProviders(
      <OrderTable 
        orders={orders} 
        loading={false} 
        onView={mockOnView} 
        onStatusUpdate={mockOnStatusUpdate} 
      />
    );
    
    const viewButton = screen.getByText(/view details/i);
    fireEvent.click(viewButton);
    
    expect(mockOnView).toHaveBeenCalledWith(mockOrder);
  });
});