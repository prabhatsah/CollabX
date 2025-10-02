// libs/common/src/dates/format-date.ts
export function formatDate(
  input: Date | string | number,
  timeZone?: string, // e.g. 'UTC' or 'America/New_York'
): string {
  const d = input instanceof Date ? input : new Date(input);
  if (isNaN(d.getTime())) throw new Error('Invalid date');

  const opts: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    ...(timeZone ? { timeZone } : {}),
  };

  const parts = new Intl.DateTimeFormat('en-CA', opts).formatToParts(d);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? '';

  return `${get('year')}-${get('month')}-${get('day')} ${get('hour')}:${get('minute')}`;
}
