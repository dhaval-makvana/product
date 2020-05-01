import React, { Component } from 'react';
import styles from './index.module.scss';
import Navbar from '../../components/navbar';
import PropTypes from 'prop-types';

class DetailsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.productId = props.location.pathname.split('/')[2];
  }

  async componentDidMount() {
    const { productsByIds } = this.props;
    const product = productsByIds[this.productId];
    if (!product) {
      this.props.fetchProductDetails(this.productId);
    }
  }

  render() {
    const { productsByIds, loading, error } = this.props;
    const product = productsByIds[this.productId];
    return (
      <div className={styles.page}>
        <Navbar />
        <div className={styles.container}>
          {product && (
            <div className={styles.product}>
              <div className={styles.preview}>
                <div className={styles.imageContainer}>
                  <img src={product.imageUrl} alt='product image' />
                </div>
                <div className={styles.actions}>
                  {product.isOutOfStock === 0 ? (
                    <>
                      <button>Add To Cart</button>
                      <button>Buy Now</button>
                    </>
                  ) : (
                    <button>Out of Stock</button>
                  )}
                </div>
              </div>
              <div className={styles.description}>
                <div className={styles.title}>{product.title}</div>
                <div className={styles.subTitle}>{product.subTitle}</div>
                <div className={styles.pricing}>
                  <div>Original Price: <span className={styles.discountedPrice}>{product.price}</span></div>
                  <div>Discounted Price: <span className={styles.price}>{product.discountedPrice}</span></div>
                </div>
                <div className={styles.sizeContainer}>
                  <span>Sizes: </span>
                  {product.sizeVariation &&
                    product.sizeVariation.map(size => {
                      return (
                        <span key={size.id} className={styles.size}>
                          {size.title}
                        </span>
                      );
                    })}
                </div>
              </div>
            </div>
          )}
          {loading && <div>Loading ...</div>}
          {error && <div>Error</div>}
        </div>
      </div>
    );
  }
}

DetailsPage.propTypes = {
  productsByIds: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  fetchProductDetails: PropTypes.func.isRequired
}

export default DetailsPage;
