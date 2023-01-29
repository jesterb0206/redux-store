import {createSlice} from '@reduxjs/toolkit';

// Here we're creating a Current Category slice object

export const currentCategorySlice = createSlice({
  name: 'currentCategory',
  initialState: '',
  reducers: {
    // Redux Toolkit's createSlice automatically uses Immer internally to let users write simpler immutable update logic using "mutating" syntax. One of the primary rules of Redux is that reducers are never allowed to mutate the original / current state values (they can make copies of the original values, and then mutate those copies, though). Here we're using createSlice so that the array push won't mutate the current state.

    updateCurrentCategory: (state, action) => {
      return action.payload;
    },
  },
});

// Here we're defining the Current Category selector

export const selectCurrentCategory = (state) => state.currentCategory;

// Here we're exporting our actions as well as our reducers

export const {updateCurrentCategory} = currentCategorySlice.actions;
export default currentCategorySlice.reducer;
