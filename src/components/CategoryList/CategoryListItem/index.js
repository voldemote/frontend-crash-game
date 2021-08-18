import React, { useState, useEffect } from "react";
import classNames from "classnames";
import { connect, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import Routes from "../../../constants/Routes";
import styles from "./styles.module.scss";
import Search from "../../Search";
import EventCard from "../../EventCard";
import { EventActions } from "../../../store/actions/event";

function CategoryListItem({ categoryItem, handleSelect }) {
    return (
        <>
            <section className={styles.categoryListItem}>
                <div
                    className={classNames(styles.box, {
                        [styles.active]: categoryItem.isActive,
                    })}
                    onClick={() => handleSelect(categoryItem.value)}
                    role="button"
                    tabIndex="0"
                >
                    <img
                        src={categoryItem.image}
                        alt={`category ${categoryItem.value}`}
                        className={styles.image}
                    />
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
