/**
 * Truncates a string to a specified length and adds an ellipsis.
 * @param text The string to truncate.
 * @param limit The character limit.
 * @returns The truncated string.
 */
export const truncateText = (text: string, limit: number): string => {
  if (text.length <= limit) {
    return text;
  }
  return text.slice(0, limit) + '...';
};
