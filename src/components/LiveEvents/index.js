import React, { useState, useEffect } from "react";
import Routes from "../../constants/Routes";
import styles from "./styles.module.scss";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router";
import Search from "../Search";

function LiveEvents({ testProp }) {
    const [searchInput, setSearchInput] = useState("");

    const handleSearchSubmit = (val) => {
        console.log("confirm search", val);
    };

    useEffect(() => {
        console.log("searchInput :>> ", searchInput);
    }, [searchInput]);

    return (
        <>
            <section className={styles.section}>
                <div className={styles.mpes}>event shortcuts</div>
                <div className={styles.search}>
                    <Search
                        value={searchInput}
                        handleChange={(value) => setSearchInput(value)}
                        handleConfirm={handleSearchSubmit}
                    />
                </div>
                <div className={styles.sort}>sort</div>
            </section>
            <section className={styles.main}>event cards here</section>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        testProp: "sdsd",
    };
};
const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(LiveEvents);
