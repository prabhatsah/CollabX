/**
 * Format a datetime string or Date into a readable format
 * @param date - ISO string, number, or Date
 * @param options - Intl.DateTimeFormatOptions (optional)
 */
export function formatDate(
  date: string | number | Date,
  options: Intl.DateTimeFormatOptions = {},
): string {
  const d = new Date(date);

  // Fallback if date is invalid
  if (isNaN(d.getTime())) return '';

  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    ...options,
  }).format(d);
}
