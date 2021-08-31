export const calcLabels = data => {
  return data.map(point => point.x);
};
export const calcDatasets = data => {
  const colorSchema = {
    main: {
      0: ['rgba(103, 81, 236, 1)'],
      1: ['rgba(241, 255, 84, 1)'],
      2: ['rgba(47, 205, 101, 1)'],
      3: ['rgba(248, 83, 251, 1)'],
    },
    fill: {
      above: {
        0: 'rgba(103, 81, 236, 0.12)',
        1: 'rgba(241, 255, 84, 0.12)',
        2: 'rgba(47, 205, 101, 0.12)',
        3: 'rgba(248, 83, 251, 0.12)',
      },
    },
  };

  return data.map((dataset, index) => {
    return {
      fill: {
        target: 'origin',
        above: colorSchema.fill.above[index],
        below: 'rgb(0, 0, 255)',
      },
      label: dataset.outcomeName,
      data: dataset.data,
      backgroundColor: colorSchema.main[index],
      borderColor: colorSchema.main[index],
      borderWidth: 2,
    };
  });
};
