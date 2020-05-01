import actions from '../store/actions';
import DetailsPage from './details';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {
    ...state.app.productDetails
  }
}

export default connect(mapStateToProps, {
  fetchProductDetails :actions.fetchProductDetails
})(DetailsPage);