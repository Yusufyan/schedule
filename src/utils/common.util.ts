export function getDateRange(startDate: Date, endDate: Date): Date[] {
  const dates: Date[] = [];
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
}

// export function parseTime(timeString: string): any {
//   const [hours, minutes] = timeString.split(':').map(Number);
//   return { hours, minutes }
// const time = new Date();
// time.setHours(hours);
// time.setMinutes(minutes);
// const onlyHours = time.setHours(hours) + ":" + time.setMinutes(minutes)
// return onlyHours;
// }
