import React, {useEffect} from 'react';
import ProductItem from '../ProductItem';
import {useQuery} from '@apollo/client';
import {QUERY_PRODUCTS} from '../../utils/queries';
import {idbPromise} from '../../utils/helpers';
import spinner from '../../assets/spinner.gif';
import {useSelector, useDispatch} from 'react-redux';
import {updateProducts, selectProducts} from '../../slices/productSlice';
import {selectCurrentCategory} from '../../slices/currentCategorySlice';

function ProductList() {
  // Get both the CurrentCategory and Products state

  const currentCategory = useSelector(selectCurrentCategory);
  const products = useSelector(selectProducts);
  const dispatch = useDispatch();

  const {loading, data} = useQuery(QUERY_PRODUCTS);

  useEffect(() => {
    if (data) {
      // Trigger the updateProducts reducer if the query has finished

      dispatch(updateProducts(data.products));
      data.products.forEach((product) => {
        idbPromise('products', 'put', product);
      });
    } else if (!loading) {
      // Return the products from IndexedDB if the query is still happening

      idbPromise('products', 'get').then((products) => {
        dispatch(updateProducts(products));
      });
    }
  }, [data, loading, dispatch]);

  function filterProducts() {
    // If the user didn't select a category, return all of the products

    if (!currentCategory) {
      return products;
    }

    // If the user selected a category, return only products from that category

    return products.filter(
      (product) => product.category._id === currentCategory
    );
  }

  return (
    <div className='my-2'>
      <h2>Our Products:</h2>
      {products.length ? (
        <div className='flex-row'>
          {/* Passes the product to the ProductItem component */}
          {filterProducts().map((product) => (
            <ProductItem
              key={product._id}
              _id={product._id}
              image={product.image}
              name={product.name}
              price={product.price}
              quantity={product.quantity}
            />
          ))}
        </div>
      ) : (
        <h3>You haven't added any products yet!</h3>
      )}
      {loading ? <img src={spinner} alt='loading' /> : null}
    </div>
  );
}

export default ProductList;
