import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../../utils/testUtils';
import CategoryForm from '../../../components/inventory/CategoryForm';

const mockOnSubmit = jest.fn();
const mockOnCancel = jest.fn();

describe('CategoryForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders form fields correctly', () => {
    renderWithProviders(<CategoryForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);
    
    expect(screen.getByText('Category Name')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.getByText('Category Image')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create category/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
  });

  test('populates form when editing category', () => {
    const mockCategory = {
      name: 'Electronics',
      description: 'Electronic items',
      image: 'test-image.jpg'
    };

    renderWithProviders(
      <CategoryForm 
        category={mockCategory} 
        onSubmit={mockOnSubmit} 
        onCancel={mockOnCancel} 
      />
    );
    
    expect(screen.getByDisplayValue('Electronics')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Electronic items')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /update category/i })).toBeInTheDocument();
  });

  test('calls onCancel when cancel button is clicked', () => {
    renderWithProviders(<CategoryForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);
    
    fireEvent.click(screen.getByRole('button', { name: /cancel/i }));
    
    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });
});