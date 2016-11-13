import moment from 'moment';

const SHORT_DATETIME = 'MM/DD/YYYY H:mmA';

export function formatTime(date) {
  return moment(date).format(SHORT_DATETIME);
}
