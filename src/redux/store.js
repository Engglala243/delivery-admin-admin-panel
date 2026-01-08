import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import dashboardSlice from './slices/dashboardSlice';
import categorySlice from './slices/categorySlice';
import productSlice from './slices/productSlice';
import userSlice from './slices/userSlice';
import driverSlice from './slices/driverSlice';
import orderSlice from './slices/orderSlice';
import uiSlice from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    dashboard: dashboardSlice,
    categories: categorySlice,
    products: productSlice,
    users: userSlice,
    drivers: driverSlice,
    orders: orderSlice,
    ui: uiSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;