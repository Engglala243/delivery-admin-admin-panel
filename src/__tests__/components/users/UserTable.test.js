import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders, mockUser } from '../../utils/testUtils';
import UserTable from '../../../components/users/UserTable';

const mockOnEdit = jest.fn();
const mockOnDelete = jest.fn();

describe('UserTable', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('displays loading spinner when loading', () => {
    const { container } = renderWithProviders(
      <UserTable users={[]} loading={true} onEdit={mockOnEdit} onDelete={mockOnDelete} />
    );
    
    expect(container.querySelector('.animate-spin')).toBeInTheDocument();
  });

  test('displays users data correctly', () => {
    const users = [mockUser];
    renderWithProviders(
      <UserTable users={users} loading={false} onEdit={mockOnEdit} onDelete={mockOnDelete} />
    );
    
    expect(screen.getByText(mockUser.name)).toBeInTheDocument();
    expect(screen.getByText(mockUser.email)).toBeInTheDocument();
    expect(screen.getByText(mockUser.phone)).toBeInTheDocument();
    expect(screen.getByText(/active/i)).toBeInTheDocument();
  });

  test('calls onEdit when edit button is clicked', () => {
    const users = [mockUser];
    renderWithProviders(
      <UserTable users={users} loading={false} onEdit={mockOnEdit} onDelete={mockOnDelete} />
    );
    
    const editButton = screen.getByText(/edit/i);
    fireEvent.click(editButton);
    
    expect(mockOnEdit).toHaveBeenCalledWith(mockUser);
  });

  test('calls onDelete when delete button is clicked', () => {
    const users = [mockUser];
    renderWithProviders(
      <UserTable users={users} loading={false} onEdit={mockOnEdit} onDelete={mockOnDelete} />
    );
    
    const deleteButton = screen.getByText(/delete/i);
    fireEvent.click(deleteButton);
    
    expect(mockOnDelete).toHaveBeenCalledWith(mockUser._id);
  });

  test('displays no users message when empty', () => {
    renderWithProviders(
      <UserTable users={[]} loading={false} onEdit={mockOnEdit} onDelete={mockOnDelete} />
    );
    
    expect(screen.getByText(/no users found/i)).toBeInTheDocument();
  });
});