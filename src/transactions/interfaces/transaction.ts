export type TransactionRecord = {pay: number, debt: number}
export interface ITransaction  {
    id: string,
    title: string,
    date: string,
    transactionMap: {[key: string]: TransactionRecord}
}