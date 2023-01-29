import {createSlice} from '@reduxjs/toolkit';

// Here we're creating a Product slice object

export const productSlice = createSlice({
  name: 'products',
  initialState: [],
  reducers: {
    // Redux Toolkit's createSlice automatically uses Immer internally to let users write simpler immutable update logic using "mutating" syntax. One of the primary rules of Redux is that reducers are never allowed to mutate the original / current state values (they can make copies of the original values, and then mutate those copies, though). Here we're using createSlice so that the array push won't mutate the current state.

    updateProducts: (state, action) => {
      return action.payload;
    },
  },
});

// Here we're defining the Product selector

export const selectProducts = (state) => state.products;

// Here we're exporting our actions as well as our reducers

export const {updateProducts} = productSlice.actions;
export default productSlice.reducer;
