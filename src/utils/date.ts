import moment from 'moment';

const NORM_DATE_PATTERN = 'YYYY-MM-DD HH:mm:ss';

export function normDateFormat(dateStr: string): string {
  return moment(dateStr).format(NORM_DATE_PATTERN);
}
