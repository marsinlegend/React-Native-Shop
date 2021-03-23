import dayjs from 'dayjs';

export const readableDate = (date) => {
  return dayjs(date).format('DD.MM.YYYY, HH:mm');
};
