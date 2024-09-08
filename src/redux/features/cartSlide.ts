// store/slices/cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Định nghĩa kiểu cho CartItem
interface CartItem {
  id: string;
  quantity: number;
  colors: string[]; // Mảng các màu sắc (hoặc bạn có thể dùng kiểu khác tùy thuộc vào nhu cầu)
  price: number;
  discount?: number; // Giảm giá có thể không có
  thumb: string; // Đường dẫn đến ảnh thu nhỏ
  title: string;
}

// Định nghĩa kiểu state cho slice
interface CartState {
  items: CartItem[];
}

// Khởi tạo state ban đầu
const initialState: CartState = {
  items: [],
};

// Tạo slice
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

// Export các action và reducer
export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
