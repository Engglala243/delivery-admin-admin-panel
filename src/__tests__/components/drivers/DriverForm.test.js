import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders, mockDriver } from '../../utils/testUtils';
import DriverForm from '../../../components/drivers/DriverForm';

const mockOnClose = jest.fn();

describe('DriverForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders all form fields', () => {
    renderWithProviders(<DriverForm onClose={mockOnClose} />);
    
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Phone')).toBeInTheDocument();
    expect(screen.getByText('License Number')).toBeInTheDocument();
    expect(screen.getByText('Vehicle Type')).toBeInTheDocument();
    expect(screen.getByText('Vehicle Model')).toBeInTheDocument();
    expect(screen.getByText('Plate Number')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
  });

  test('populates form when editing driver', () => {
    renderWithProviders(<DriverForm driver={mockDriver} onClose={mockOnClose} />);
    
    expect(screen.getByDisplayValue(mockDriver.name)).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockDriver.email)).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockDriver.licenseNumber)).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockDriver.vehicleInfo.model)).toBeInTheDocument();
  });

  test('shows vehicle type options', () => {
    renderWithProviders(<DriverForm onClose={mockOnClose} />);
    
    expect(screen.getByText('Motorcycle')).toBeInTheDocument();
    expect(screen.getByText('Car')).toBeInTheDocument();
    expect(screen.getByText('Bicycle')).toBeInTheDocument();
    expect(screen.getByText('Scooter')).toBeInTheDocument();
    expect(screen.getByText('Van')).toBeInTheDocument();
  });
});