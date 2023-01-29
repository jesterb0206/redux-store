import {createSlice} from '@reduxjs/toolkit';

// Here we're creating a Cart slice object

export const cartOpenSlice = createSlice({
  name: 'cartOpen',
  initialState: false,
  reducers: {
    // Redux Toolkit's createSlice automatically uses Immer internally to let users write simpler immutable update logic using "mutating" syntax. One of the primary rules of Redux is that reducers are never allowed to mutate the original / current state values (they can make copies of the original values, and then mutate those copies, though). Here we're using createSlice so that the array push won't mutate the current state.

    toggleCart: (state, actions) => {
      return (state = !state);
    },
  },
});

// Here we're defining the Cart Open selector

export const selectCartOpen = (state) => state.cartOpen;

// Here we're exporting our actions as well as our reducers

export const {toggleCart} = cartOpenSlice.actions;
export default cartOpenSlice.reducer;
