const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
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

/**
 * Formats a Date object into the "Wkd Day, Month Year" format.
 * e.g., "Wed 31, July 2024"
 * @param date The date to format.
 * @returns The formatted date string.
 */
export const formatDate = (date: Date): string => {
  const weekday = weekdays[date.getDay()];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${weekday} ${day}, ${month} ${year}`;
};
