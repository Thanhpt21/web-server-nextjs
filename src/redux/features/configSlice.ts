// redux/configSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface ConfigState {
  config: {
    name: string;
    phone: string;
    email: string;
    address: string;
    facebook?: string;
    zalo?: string;
    instagram?: string;
    tiktok?: string;
    youtube?: string;
    messenger?: string;
    logo?: string;
    favicon?: string;
  } | null;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: ConfigState = {
  config: null,
  status: 'idle',
};

export const fetchConfig = createAsyncThunk('config/fetchConfig', async () => {
  const response = await axios.get('http://localhost:8080/api/v1/configs');
  return response.data;
});

const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchConfig.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchConfig.fulfilled, (state, action) => {
        state.config = action.payload;
        state.status = 'idle';
      })
      .addCase(fetchConfig.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default configSlice.reducer;
