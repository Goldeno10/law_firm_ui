export function getGoogleCalendarUrl(event: {
  title: string;
  description: string;
  start: string; // ISO String
  durationMinutes: number;
}) {
  const startDate = new Date(event.start);
  const endDate = new Date(startDate.getTime() + event.durationMinutes * 60000);

  const formatDate = (date: Date) => date.toISOString().replace(/-|:|\.\d+/g, '');

  const url = new URL('https://calendar.google.com/calendar/render');
  url.searchParams.append('action', 'TEMPLATE');
  url.searchParams.append('text', event.title);
  url.searchParams.append('details', event.description);
  url.searchParams.append('dates', `${formatDate(startDate)}/${formatDate(endDate)}`);

  return url.toString();
}