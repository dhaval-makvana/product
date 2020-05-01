import { FETCH_PRODUCT_LIST, FETCH_PRODUCT_DETAILS } from './types';
import axios from 'axios';

const fetchProductList = (query, pageNumber) => async dispatch => {
  let cancel, loading = true, hasMore = false, products = [], error = false;
  const res = await axios({
    method: 'GET',
    url: 'http://localhost:3000/api/products/getProduct',
    params: { query, pageNumber },
    cancelToken: new axios.CancelToken(c => (cancel = c))
  })

  try {
    products = res.data.data;
    hasMore = res.data.data.length > 0;
    loading = false;
  } catch (error) {
    if (axios.isCancel(err)) return;
    error = true;
  }

  const payload = { loading, products, error, hasMore };
  return dispatch({ type: FETCH_PRODUCT_LIST, payload });
};

const fetchProductDetails = (id) => async dispatch => {
  let loading = true, product = {}, error = false;
  const res = await axios({
    method: 'GET',
    url: 'http://localhost:3000/api/products/',
    params: { id }
  })

  try {
    product = res.data.data;
    loading = false;
  } catch (error) {
    error = true;
  }

  const payload = { loading, product, error};
  return dispatch({ type: FETCH_PRODUCT_DETAILS, payload });
};

export default { fetchProductList, fetchProductDetails };
