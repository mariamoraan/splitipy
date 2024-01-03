export const getDateToYYYYMMDD = (date: Date) => {
    return `${date.getFullYear()}-${date.getMonth()+1 <= 9 ? `0${date.getMonth()+1}` : date.getMonth()+1}-${date.getDate() <= 9 ? `0${date.getDate()}` : date.getDate()}`
};
export const getDateString = (date: Date) =>  date.toLocaleString('default', { day: '2-digit', month: 'short', year: 'numeric' });
export const compareDates = (date1: Date, date2: Date) => {
    if(date1 > date2) return -1
    else if(date1 < date2) return 1
    else return 0
}
