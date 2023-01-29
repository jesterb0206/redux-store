import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Link, useParams} from 'react-router-dom';
import {useQuery} from '@apollo/client';

import Cart from '../components/Cart';
import {
  updateCartQuantity,
  removeFromCart,
  addToCart,
  selectCart,
} from '../slices/cartSlice';
import {updateProducts, selectProducts} from '../slices/productSlice';
import {QUERY_PRODUCTS} from '../utils/queries';
import {idbPromise} from '../utils/helpers';
import spinner from '../assets/spinner.gif';

function Detail() {
  const products = useSelector(selectProducts);
  const cart = useSelector(selectCart);
  const dispatch = useDispatch();
  const {id} = useParams();

  const [currentProduct, setCurrentProduct] = useState({});

  const {loading, data} = useQuery(QUERY_PRODUCTS);

  useEffect(() => {
    // already in global store
    if (products.length) {
      setCurrentProduct(products.find((product) => product._id === id));
    }
    // retrieved from server
    else if (data) {
      dispatch(updateProducts(data.products));
      data.products.forEach((product) => {
        idbPromise('products', 'put', product);
      });
    }
    // get cache from idb
    else if (!loading) {
      idbPromise('products', 'get').then((indexedProducts) => {
        dispatch(updateProducts(indexedProducts));
      });
    }
  }, [products, data, loading, dispatch, id]);

  const handleAddToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === id);
    if (itemInCart) {
      dispatch(
        // If the product is already in the customer's shopping cart and they wish to purchase another one increase the quantity

        updateCartQuantity({
          _id: id,
          purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
        })
      );
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      // Adds the product to the shopping cart and sets its quantity to one

      dispatch(addToCart({...currentProduct, purchaseQuantity: 1}));
      idbPromise('cart', 'put', {...currentProduct, purchaseQuantity: 1});
    }
  };

  const handleRemoveFromCart = () => {
    // Removes the product from the customer's cart and their cache

    dispatch(removeFromCart(currentProduct));
    idbPromise('cart', 'delete', {...currentProduct});
  };

  return (
    <>
      {currentProduct && cart ? (
        <div className='container my-1'>
          <Link to='/'>← Back to Products</Link>

          <h2>{currentProduct.name}</h2>

          <p>{currentProduct.description}</p>

          <p>
            <strong>Price:</strong>${currentProduct.price}{' '}
            <button onClick={handleAddToCart}>Add to Cart</button>
            <button
              disabled={!cart.find((p) => p._id === currentProduct._id)}
              onClick={handleRemoveFromCart}
            >
              Remove from Cart
            </button>
          </p>

          <img
            src={`/images/${currentProduct.image}`}
            alt={currentProduct.name}
          />
        </div>
      ) : null}
      {loading ? <img src={spinner} alt='loading' /> : null}
      <Cart />
    </>
  );
}

export default Detail;
