import {configureStore} from '@reduxjs/toolkit';

// Here we're importing our reducers from the slices folder

import productReducer from '../slices/productSlice';
import cartReducer from '../slices/cartSlice';
import cartOpenReducer from '../slices/cartOpenSlice';
import categoriesReducer from '../slices/categoriesSlice';
import currentCategoryReducer from '../slices/currentCategorySlice';

// Here we're configuring the store object and exporting it

export default configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    cartOpen: cartOpenReducer,
    categories: categoriesReducer,
    currentCategory: currentCategoryReducer,
  },
});
