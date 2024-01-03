export const getDateToYYYYMMDD = (date: string) => {
    const formatDate = new Date(date)
    return `${formatDate.getFullYear()}-${formatDate.getMonth()+1 <= 9 ? `0${formatDate.getMonth()+1}` : formatDate.getMonth()+1}-${formatDate.getDate() <= 9 ? `0${formatDate.getDate()}` : formatDate.getDate()}`
};
export const getDateString = (date: string) =>  new Date(date).toLocaleString('default', { day: '2-digit', month: 'short', year: 'numeric' });
export const compareDates = (date1: Date, date2: Date) => {
    if(date1 > date2) return -1
    else if(date1 < date2) return 1
    else return 0
}
