import { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import styles from './styles.module.scss';
import ChartCtr from '../../config/chart';
import { chartOptions } from '../../helper/Chart/chartOptions';
import Button from '../Button';

export default function Chart({ data, filterActive, handleChartPeriodFilter }) {
  const chartEl = useRef(null);

  useEffect(() => {
    let chartInstance;

    if (chartEl.current) {
      const ctx = chartEl.current.getContext('2d');

      chartInstance = new ChartCtr(ctx, chartOptions('line', data));
    }
  }, []);

  return (
    <>
      <div className={styles.chartContainer}>
        <div className={styles.filters}>
          <Button
            className={classNames(styles.filterButton, {
              [styles.active]: filterActive === '24H',
            })}
            onClick={handleChartPeriodFilter}
          >
            24H
          </Button>
          <Button
            className={classNames(styles.filterButton, {
              [styles.active]: filterActive === '7D',
            })}
            onClick={handleChartPeriodFilter}
          >
            7D
          </Button>
          <Button
            className={classNames(styles.filterButton, {
              [styles.active]: filterActive === '30D',
            })}
            onClick={handleChartPeriodFilter}
          >
            30D
          </Button>
        </div>
        <canvas ref={chartEl} height="400"></canvas>
      </div>
    </>
  );
}
