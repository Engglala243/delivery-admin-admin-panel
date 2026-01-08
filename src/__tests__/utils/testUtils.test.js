import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../../redux/slices/authSlice";
import userSlice from "../../redux/slices/userSlice";
import driverSlice from "../../redux/slices/driverSlice";
import orderSlice from "../../redux/slices/orderSlice";
import uiSlice from "../../redux/slices/uiSlice";
import dashboardSlice from "../../redux/slices/dashboardSlice";
import categorySlice from "../../redux/slices/categorySlice";
import productSlice from "../../redux/slices/productSlice";

export const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      auth: authSlice,
      users: userSlice,
      drivers: driverSlice,
      orders: orderSlice,
      ui: uiSlice,
      dashboard: dashboardSlice,
      categories: categorySlice,
      products: productSlice,
    },
    preloadedState: initialState,
  });
};

export const renderWithProviders = (
  ui,
  {
    preloadedState = {},
    store = createMockStore(preloadedState),
    ...renderOptions
  } = {}
) => {
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <div>{children}</div>
      </Provider>
    );
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};

export const mockUser = {
  _id: "1",
  name: "John Doe",
  email: "john@example.com",
  phone: "+1234567890",
  address: {
    street: "123 Main St",
    city: "New York",
    state: "NY",
    zipCode: "10001",
  },
  isActive: true,
};

export const mockDriver = {
  _id: "1",
  name: "Driver One",
  email: "driver@example.com",
  phone: "+1234567890",
  licenseNumber: "DL123456",
  vehicleInfo: {
    type: "Car",
    model: "Toyota Prius",
    plateNumber: "ABC123",
  },
  status: "available",
};

export const mockOrder = {
  _id: "1",
  orderNumber: "ORD001",
  user: mockUser,
  items: [
    {
      product: { _id: "1", name: "Test Product" },
      quantity: 2,
      price: 10.99,
    },
  ],
  totalAmount: 21.98,
  status: "pending",
  deliveryAddress: mockUser.address,
  createdAt: new Date().toISOString(),
};

// Simple test to prevent empty test suite error
describe('Test Utils', () => {
  test('should export utility functions', () => {
    expect(createMockStore).toBeDefined();
    expect(renderWithProviders).toBeDefined();
    expect(mockUser).toBeDefined();
    expect(mockDriver).toBeDefined();
    expect(mockOrder).toBeDefined();
  });
});