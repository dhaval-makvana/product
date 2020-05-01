import React, { Component, createRef } from 'react';
import styles from './index.module.scss';
import Navbar from '../../components/navbar';
import Searchbar from '../../components/searchbar';
import ProductCard from '../../components/productcard';
import ScrollToTopController from '../../components/ScrollToTop';
import PropTypes from 'prop-types';

class ListingPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      query: '',
      pageNumber: 1
    };
    this.observer = createRef();
  }

  async componentDidMount() {
    const { query, pageNumber } = this.state;
    this.props.fetchProductList(query, pageNumber);
  }

  handleSearch = e => {
    this.props.fetchProductList(e.target.value, 1);
  };

  lastProductElementRef = (node) => {
    const { loading, hasMore } = this.props;
    if (loading) return;
    if (this.observer.current) this.observer.current.disconnect();
    this.observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        let { pageNumber, query } = this.state;
        this.props.fetchProductList(query, pageNumber + 1);
        this.setState((prevState) => {
          return {
            ...prevState,
            pageNumber: prevState.pageNumber + 1
          }
        });
      }
    });
    if (node) this.observer.current.observe(node);
    
  }

  render() {
    console.log("this.props listing", this.props);
    const {loading, hasMore, products, error, history} = this.props;
    return(
      <div className={styles.page}>
      <ScrollToTopController>
        <Navbar />
        <Searchbar placeholder='Search' onChange={this.handleSearch} />
        <div className={styles.grid}>
          {products.map((p, index) => {
            if (products.length === index + 1) {
              return <ProductCard {...p} key={p.id} history={history} ref={this.lastProductElementRef} />;
            } else {
              return <ProductCard {...p} history={history} key={p.id} />;
            }
          })}
          {loading && <div>Loading ...</div>}
          {error && <div>Error</div>}
        </div>
      </ScrollToTopController>
    </div>
    )
  }
}

ListingPage.propTypes = {
  loading: PropTypes.bool.isRequired,
  hasMore: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  products: PropTypes.array.isRequired,
  fetchProductList: PropTypes.func.isRequired
}

export default ListingPage;