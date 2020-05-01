import React from 'react';
import styles from './style.module.scss';
import { NavLink } from 'react-router-dom';

export default () => {
  return (
    <div className={styles.navbar}>
      <div className={styles.navitem}>
        <NavLink to="/">
          <img src="https://assets.coverfox.com/static/global/img/logos/cf-dark-orange-h31.b093a8cf9e87.svg" alt="logo" />
        </NavLink>
      </div>
    </div>
  );
};
