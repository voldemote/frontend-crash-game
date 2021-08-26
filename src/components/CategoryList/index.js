import React, { useState, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import styles from './styles.module.scss';
import CategoryListItem from './CategoryListItem';

function CategoryList({ categories }) {
  return (
    <>
      <section className={styles.categoryList}>
        {categories.map((item, index) => (
          <CategoryListItem key={index} categoryItem={item} />
        ))}
      </section>
    </>
  );
}

export default CategoryList;
