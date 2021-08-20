import React, { useState, useEffect } from 'react';
import Routes from '../../constants/Routes';
import styles from './styles.module.scss';
import { connect, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import Search from '../Search';
import EventCard from '../EventCard';
import { EventActions } from '../../store/actions/event';
import CategoryListItem from './CategoryListItem';

function CategoryList({ categories, handleSelect }) {
    return (
        <>
            <section className={styles.categoryList}>
                {categories.map((item, index) => (
                    <CategoryListItem
                        key={index}
                        categoryItem={item}
                        handleSelect={handleSelect}
                    />
                ))}
            </section>
        </>
    );
}

export default CategoryList;
