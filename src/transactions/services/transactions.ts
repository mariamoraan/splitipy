import { generateUid } from "src/common/utils/generateUid";
import { ITransaction, TransactionRecord } from "../interfaces/transaction";
import { LocalDB } from "src/common/services/localDB";
import { TRANSACTIONS } from "../constants/keys";
import { compareDates } from "src/common/utils/dates";

export const getTransactions = ():ITransaction[] => {
    const transactions: ITransaction[] = JSON.parse(LocalDB.get(TRANSACTIONS)) as ITransaction[] || []
    return transactions
}   

export const getTransactionById = (id: string) => getTransactions().find(transaction => transaction.id === id)

export const createTransaction = (transaction: Omit<ITransaction, 'id'>) => {
    const newTransaction: ITransaction = {...transaction, id: generateUid()}
    const currentTransactions: ITransaction[] = getTransactions()
    currentTransactions.push(newTransaction)
    LocalDB.create(TRANSACTIONS, currentTransactions)
    return newTransaction
}

export const calculateTransactionAmount = (transactionMap: {[key: string]: TransactionRecord}) => {
    return Object.values(transactionMap).reduce((prev, {pay}) => prev + pay, 0)
}

export const calculateTransactionDebts = (transactionMap: {[key: string]: TransactionRecord}) => {
    const usersNumber = Object.keys(transactionMap).length
    const amount = calculateTransactionAmount(transactionMap)
    const amountByPerson = amount/usersNumber
    Object.keys(transactionMap).forEach(id => {
        // debt > 0 means user debts money, debt < 0 means user is debted money
        transactionMap[id].debt = parseFloat((amountByPerson - transactionMap[id].pay).toFixed(2))
    })
    return transactionMap
}

export const compareTransactions = (transaction1: ITransaction, transaction2:ITransaction) => compareDates(new Date(transaction1.date), new Date(transaction2.date))