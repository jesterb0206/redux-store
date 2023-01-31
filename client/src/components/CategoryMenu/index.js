import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useQuery} from '@apollo/client';
import {updateCategories, selectCategories} from '../../slices/categoriesSlice';
import {updateCurrentCategory} from '../../slices/currentCategorySlice';
import {QUERY_CATEGORIES} from '../../utils/queries';
import {idbPromise} from '../../utils/helpers';

function CategoryMenu() {
  // Here we're retrieving the categories state and dispatch function

  const categories = useSelector(selectCategories);
  const dispatch = useDispatch();

  const {loading, data: categoryData} = useQuery(QUERY_CATEGORIES);

  useEffect(() => {
    if (categoryData) {
      // Update the categories state with the new category data

      dispatch(updateCategories(categoryData.categories));

      // Save the data to IndexedDB

      categoryData.categories.forEach((category) => {
        idbPromise('categories', 'put', category);
      });
    } else if (!loading) {
      // Retrieve the data from IndexedDB

      idbPromise('categories', 'get').then((categories) => {
        dispatch(updateCategories(categories));
      });
    }
  }, [categoryData, loading, dispatch]);

  const handleClick = (id) => {
    // Upon clicking on a category the product's current category will be updated

    dispatch(updateCurrentCategory(id));
  };

  return (
    <div>
      <h2>Choose a Category:</h2>
      {categories.map((item) => (
        <button
          key={item._id}
          onClick={() => {
            handleClick(item._id);
          }}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}

export default CategoryMenu;
