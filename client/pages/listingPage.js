import actions from '../store/actions';
import ListingPage from './listing';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {
    ...state.app.listing
  }
}

export default connect(mapStateToProps, {
  fetchProductList :actions.fetchProductList
})(ListingPage);