import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import driverService from '../../api/services/driver.service';

export const fetchDrivers = createAsyncThunk(
  'drivers/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await driverService.getAll();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch drivers');
    }
  }
);

export const createDriver = createAsyncThunk(
  'drivers/create',
  async (driverData, { rejectWithValue }) => {
    try {
      const response = await driverService.create(driverData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to create driver');
    }
  }
);

export const updateDriver = createAsyncThunk(
  'drivers/update',
  async ({ id, driverData }, { rejectWithValue }) => {
    try {
      const response = await driverService.update(id, driverData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to update driver');
    }
  }
);

export const deleteDriver = createAsyncThunk(
  'drivers/delete',
  async (id, { rejectWithValue }) => {
    try {
      await driverService.delete(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to delete driver');
    }
  }
);

const driverSlice = createSlice({
  name: 'drivers',
  initialState: {
    drivers: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDrivers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDrivers.fulfilled, (state, action) => {
        state.loading = false;
        state.drivers = action.payload;
      })
      .addCase(fetchDrivers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createDriver.fulfilled, (state, action) => {
        state.drivers.push(action.payload);
      })
      .addCase(updateDriver.fulfilled, (state, action) => {
        const index = state.drivers.findIndex(driver => driver._id === action.payload._id);
        if (index !== -1) {
          state.drivers[index] = action.payload;
        }
      })
      .addCase(deleteDriver.fulfilled, (state, action) => {
        state.drivers = state.drivers.filter(driver => driver._id !== action.payload);
      });
  },
});

export const { clearError } = driverSlice.actions;
export default driverSlice.reducer;