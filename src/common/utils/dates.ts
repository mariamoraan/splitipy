export const getDateToYYYYMMDD = (date: string) => {
    const formatDate = new Date(date)
    return `${formatDate.getFullYear()}-${formatDate.getMonth()+1 <= 9 ? `0${formatDate.getMonth()+1}` : formatDate.getMonth()+1}-${formatDate.getDate() <= 9 ? `0${formatDate.getDate()}` : formatDate.getDate()}`
};
export const getDateString = (date: string) =>  new Date(date).toLocaleString('default', { day: '2-digit', month: 'short', year: 'numeric' });
export const compareDates = (date1: string, date2: string) => {
    const formatedData1 = new Date(date1)
    const formatedDate2 = new Date(date2)
    if(formatedData1 > formatedDate2) return 1
    else if(formatedDate2 < formatedData1) return -1
    else return 0
}
