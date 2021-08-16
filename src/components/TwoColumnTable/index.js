import React from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import searchLarge from '../../data/icons/searchLarge.svg';

const TwoColumnTable = ({ headings: [firstHeading, secondHeading], rows, noResultMessage = 'No results.' }) => {
  
  return (
    <>
      <div className={styles.twoColumnTable}>
        <div className={classNames(styles.row, styles.header)}>
          <span>{firstHeading}</span>
          <span>{secondHeading}</span>
        </div>
        <div className={styles.tableBody}>
          {
            rows.map(([firstCell, secondCell], key) => {
                return (
                    <div key={key} className={styles.row}>
                        <div className={styles.cell}>
                            {firstCell}
                        </div>
                        <div className={styles.cell}>
                            {secondCell}
                        </div>
                    </div>
                )
            })
          }
          {
            rows.length === 0 && (
                <div className={styles.noResults}>
                    <img src={searchLarge} alt="search icon"/>
                    <span>{noResultMessage}</span>
                </div>
            )
          }
        </div>
      </div>
    </>
  );
};

export default TwoColumnTable;
