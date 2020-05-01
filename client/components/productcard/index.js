import React, { forwardRef } from 'react';
import styles from './style.module.scss';
import { withRouter } from 'react-router-dom';

export default forwardRef((props, ref) => {
  const { imageUrl, title, subTitle, id, history } = props;
  return (
    <div className={styles.card} ref={ref} onClick={() => history.push(`/product/${id}`)}>
      <div className={styles.preview}>
        {imageUrl && <img src={imageUrl} alt="product image" />}
      </div>
      <div className={styles.title}>{title}</div>
      <div className={styles.description}>{subTitle}</div>
    </div>
  )
});