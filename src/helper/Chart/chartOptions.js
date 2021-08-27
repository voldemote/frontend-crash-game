import { calcLabels } from './chartHelpers';

export const chartOptions = (type, data) => {
  const labels = calcLabels('hours');
  console.log('labels :>> ', labels, new Date('2021-08-27T15:00:00Z'));

  return {
    type,
    data: {
      labels: [
        new Date('2021-08-27T15:00:00Z'),
        new Date('2021-08-27T17:00:00Z'),
        new Date('2021-08-27T20:00:00Z'),
      ],
      datasets: [
        {
          fill: {
            target: 'origin',
            above: 'rgba(255, 0, 0, 0.12)', // Area will be red above the origin
            below: 'rgb(0, 0, 255)', // And blue below the origin
          },
          label: 'Yes',
          data: [
            // 20, 25, 10,
            { x: '2021-08-27T15:00:00Z', y: 20 },
            { x: '2021-08-27T17:00:00Z', y: 25 },
            { x: '2021-08-27T20:00:00Z', y: 10 },
          ],
          backgroundColor: ['rgba(255, 99, 132, 0.2)'],
          borderColor: ['yellow'],
          borderWidth: 2,
        },
        {
          fill: {
            target: 'origin',
            above: 'rgba(0, 0, 255, 0.12)', // Area will be red above the origin
            below: 'rgb(0, 0, 255)', // And blue below the origin
          },
          label: 'No',
          data: [
            // 8, 34, 28,
            { x: new Date('2021-08-27T15:00:00Z'), y: 8 },
            { x: new Date('2021-08-27T17:00:00Z'), y: 30 },
            { x: new Date('2021-08-27T20:00:00Z'), y: 54 },
          ],
          backgroundColor: ['rgba(255, 99, 132, 0.2)'],
          borderColor: ['rgba(255, 99, 132, 1)'],
          borderWidth: 2,
        },
      ],
    },
    options: {
      hover: {
        mode: 'nearest',
        intersect: true,
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
              console.log('value :>> ', value);
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
