import { sendRequest } from '@/utils/api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


interface User {
    _id: string;
    name: string;
    // Các thuộc tính khác của người dùng
  }


interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
    user: null,
    loading: false,
    error: null,
};



// Thunk để lấy thông tin người dùng
export const fetchUser = createAsyncThunk<User, string, { rejectValue: string }>(
    'user/fetchUser',
    async (token, thunkAPI) => {
        try {
            const response = await sendRequest<IBackendRes<any>>({
                url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/blogs`, // Cập nhật URL cho blogs
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);



const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string | null;
            })
    }
});

export default userSlice.reducer;
