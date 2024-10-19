type FormatType = 'fullDate' | 'monthWithYear'
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export function dateFormatter(dateStr: string, format: FormatType): string {
  const date = new Date(dateStr);
  if(format === 'fullDate') {
    const month = date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth();
    const day = date.getDay() < 10 ? `0${date.getDay()}` : date.getDay();
    return `${date.getFullYear()}-${month }-${day}`;
  } else {
    return `${MONTHS[date.getMonth() + 1]} ${date.getFullYear()}`;
  }

}
