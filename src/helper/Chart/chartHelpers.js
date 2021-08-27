import moment from 'moment';
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const hours = ['01', '02', '03'];

export const calcLabels = type => {
  const map = {
    months,
    // hours,
    hours: hours.map(item => new Date(item)),
  };
  return map[type];
};
