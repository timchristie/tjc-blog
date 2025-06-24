import React from 'react';
import styles from './DashboardContent.module.scss';

const DashboardContent = (): JSX.Element => {
  return (
    <div className={styles.dashboard}>
      <h1>Dashboard</h1>
      <div className={styles.grid}>
        <div className={styles.preview}>
        <h3><img src="/icons/post.svg" alt="Posts" /> Add a new post</h3>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
