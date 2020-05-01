import { FETCH_PRODUCT_LIST, FETCH_PRODUCT_DETAILS } from './types';
import { combineReducers } from 'redux';

const initialState = {
  listing: {
    loading: true,
    error: false,
    hasMore: false,
    products: []
  },
  productDetails: {
    loading: true,
    error: false,
    productsByIds: {},
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCT_LIST:
      const { products } = action.payload;
      const productsByIds = {
        ...state.productDetails.productsByIds
      };
      products.map((product) => {
        productsByIds[product.id] = product
      });
      const previousProducts = [...state.listing.products, ...products];
      const hasMore = products.length > 0;
      return {
        ...state,
        listing: {
          ...state.listing,
          ...action.payload,
          hasMore,
          products: previousProducts
        },
        productDetails: {
          ...state.productDetails,
          productsByIds
        }
      };
    
    case FETCH_PRODUCT_DETAILS:
      const { product, loading, error } = action.payload;
      return {
        ...state,
        productDetails: {
          loading,
          error,
          productsByIds: {
            ...state.productDetails.productsByIds,
            [product.id] : product
          }
        }
      }
  
    default:
      return state;
  }
}

export default combineReducers({
  app: reducer
});