import moment from 'moment';

export const formatSingleNumber = (_: number) => (_ > 9 ? _.toString() : `0${_}`);

export const parseDurationVideo = (quantity: number) => {
  const duration = moment.duration(quantity, 'second');

  return `${formatSingleNumber(duration.minutes())}:${formatSingleNumber(duration.seconds())}`;
};
