import { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import styles from './styles.module.scss';
import ChartCtr from '../../config/chart';
import { chartOptions } from '../../helper/Chart/chartOptions';

export default function Chart({ data }) {
  const chartEl = useRef(null);

  useEffect(() => {
    let chartInstance;

    if (chartEl.current) {
      const ctx = chartEl.current.getContext('2d');

      chartInstance = new ChartCtr(ctx, chartOptions('line', data));
    }
  }, []);

  return (
    <div className={styles.chartContainer}>
      <canvas ref={chartEl}></canvas>
    </div>
  );
}
