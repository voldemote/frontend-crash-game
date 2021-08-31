import { calcLabels, calcDatasets } from './chartHelpers';
import legendPadding from './plugins/legendHeightPlugin';

export const chartOptions = (type, data) => {
  console.log('calcDatasets(data) :>> ', calcDatasets(data));

  return {
    type,
    plugins: [legendPadding],
    data: {
      labels: calcLabels(data[0].data),
      datasets: calcDatasets(data),
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          align: 'start',
          labels: {
            usePointStyle: true,
            pointStyle: 'circle',
          },
        },
        tooltip: {
          mode: 'index',
          intersect: false,
          // position: 'nearest',
          // axis: 'y',
        },
      },
      scales: {
        x: {
          type: 'time',
          // time: {
          //     unit: 'months',
          //     displayFormats: {
          //         hour: 'HH:mm',
          //     },
          // },
          ticks: {
            source: 'auto',
            callback: function (value) {
              // console.log('value :>> ', value);
              return value;
            },
          },
        },
        y: {
          beginAtZero: true,
        },
      },
    },
  };
};
