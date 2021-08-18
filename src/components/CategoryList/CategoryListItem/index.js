import React, { useState, useEffect } from "react";
import Routes from "../../../constants/Routes";
import styles from "./styles.module.scss";
import { connect, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import Search from "../../Search";
import EventCard from "../../EventCard";
import { EventActions } from "../../../store/actions/event";

function CategoryListItem({ categoryItem, handleSelect }) {
    return (
        <>
            <section className={styles.categoryListItem}>
                <div
                    className={styles.box}
                    onClick={() => handleSelect(categoryItem.value)}
                    role="button"
                    tabIndex="0"
                >
                    {/* {categoryItem.image} */}
                    {categoryItem.value}
                </div>
            </section>
        </>
    );
}

const mapStateToProps = (state) => {
    return {};
};
const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryListItem);
