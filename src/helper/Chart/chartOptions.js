import { calcLabels } from './chartHelpers';

export const chartOptions = (type, data) => {
  const labels = calcLabels('hours');
  console.log('labels :>> ', labels, new Date('2021-08-27T15:00:00Z'));

  const legendPadding = {
    beforeInit(chart) {
      // Get reference to the original fit function
      const originalFit = chart.legend.fit;

      // Override the fit function
      chart.legend.fit = function fit() {
        // Call original function and bind scope in order to use `this` correctly inside it
        originalFit.bind(chart.legend)();
        // Change the height as suggested in another answers
        this.height += 30;
      };
    },
  };

  return {
    type,
    plugins: [legendPadding],
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
            above: 'rgba(103, 81, 236, 0.12)', // Area will be red above the origin
            below: 'rgb(0, 0, 255)', // And blue below the origin
          },
          label: 'Yes',
          data: [
            // 20, 25, 10,
            { x: new Date('2021-08-27T15:00:00Z'), y: 20 },
            { x: new Date('2021-08-27T17:00:00Z'), y: 25 },
            { x: new Date('2021-08-27T20:00:00Z'), y: 10 },
          ],
          backgroundColor: ['rgba(103, 81, 236, 1)'],
          borderColor: ['rgba(103, 81, 236, 1)'],
          borderWidth: 2,
        },
        {
          fill: {
            target: 'origin',
            above: 'rgba(241, 255, 84, 0.12)', // Area will be red above the origin
            below: 'rgb(0, 0, 255)', // And blue below the origin
          },
          label: 'No',
          data: [
            // 8, 34, 28,
            { x: new Date('2021-08-27T15:00:00Z'), y: 8 },
            { x: new Date('2021-08-27T17:00:00Z'), y: 30 },
            { x: new Date('2021-08-27T20:00:00Z'), y: 54 },
          ],
          backgroundColor: ['rgba(241, 255, 84, 1)'],
          borderColor: ['rgba(241, 255, 84, 1)'],
          borderWidth: 2,
        },
      ],
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
