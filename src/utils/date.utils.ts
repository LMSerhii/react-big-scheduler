import moment from 'moment';

export const formatDate = (date: Date): string => {
  return moment(date).format('YYYY-MM-DD');
};

export const getWeekRange = (date: Date) => {
  const start = moment(date).startOf('week');
  const end = moment(date).endOf('week');
  return { start, end };
};