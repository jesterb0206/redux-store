import {createSlice} from '@reduxjs/toolkit';

// Here we're creating a Categories slice object

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState: [],
  reducers: {
    // Redux Toolkit's createSlice automatically uses Immer internally to let users write simpler immutable update logic using "mutating" syntax. One of the primary rules of Redux is that reducers are never allowed to mutate the original / current state values (they can make copies of the original values, and then mutate those copies, though). Here we're using createSlice so that the array push won't mutate the current state.

    updateCategories: (state, action) => {
      return action.payload;
    },
  },
});

// Here we're defining the Categories selector

export const selectCategories = (state) => state.categories;

// Here we're exporting our actions as well as our reducers

export const {updateCategories} = categoriesSlice.actions;
export default categoriesSlice.reducer;
