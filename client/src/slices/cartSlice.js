/* eslint-disable array-callback-return */
import {createSlice} from '@reduxjs/toolkit';

// Here we're creating a Cart slice object

export const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    // Redux Toolkit's createSlice automatically uses Immer internally to let users write simpler immutable update logic using "mutating" syntax. One of the primary rules of Redux is that reducers are never allowed to mutate the original / current state values (they can make copies of the original values, and then mutate those copies, though). Here we're using createSlice so that the array push won't mutate the current state.

    addToCart: (state, action) => {
      state.push(action.payload);
    },
    addMultipleToCart: (state, action) => {
      state.push(...action.payload);
    },
    updateCartQuantity: (state, action) => {
      state.map((item) => {
        if (item._id === action.payload._id) {
          return (item.purchaseQuantity = action.payload.purchaseQuantity);
        }
      });
    },
    removeFromCart: (state, action) => {
      return state.filter((item) => item._id !== action.payload._id);
    },
    clearCart: (state, action) => {
      return '';
    },
  },
});

// Here we're defining the Cart selector

export const selectCart = (state) => state.cart;

// Here we're exporting our actions as well as our reducers

export const {
  addToCart,
  addMultipleToCart,
  updateCartQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
