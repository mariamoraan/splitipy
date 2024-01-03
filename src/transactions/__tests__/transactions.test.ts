import {describe, expect, test, beforeEach, jest} from '@jest/globals';
import { LocalDB } from 'src/common/services/localDB';
import { getTransactions, getTransactionById, createTransaction, calculateTransactionAmount, calculateTransactionDebts} from '../services/transactions';
import { TRANSACTIONS } from '../constants/keys';
import { ITransaction } from '../interfaces/transaction';
import * as TransactionsService from '../services/transactions'

const transactionWithoutId = {title: 'Transaction 1', date: '2024-10-2', transactionMap: {}}
const storagedTransactions: ITransaction[] = [
    {...transactionWithoutId ,id: 'dasdas-dsads'}
]

const transactionMap = {
    'sasads-dasdsa': {pay: 50, debt: -30},
    'ewqeqwe-dasdsa': {pay: 30, debt: -10},
    'eqewewq-dasdsa': {pay: 0, debt: 20},
    'qewqew-dasdsa': {pay: 0, debt: 20},
}

const transactionMapWithoutDebts = {
    'sasads-dasdsa': {pay: 50, debt: 0},
    'ewqeqwe-dasdsa': {pay: 30, debt: 0},
    'eqewewq-dasdsa': {pay: 0, debt: 0},
    'qewqew-dasdsa': {pay: 0, debt: 0},
}

describe('transactions service module', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })
    test('getTransactions must call LocalDB.get with TRANSACTIONS key', () => {
        // Given
        const spyGet = jest.spyOn(LocalDB, 'get')
        // When
        getTransactions()
        // Then
        expect(spyGet).toHaveBeenCalledWith(TRANSACTIONS);
    })
    test('getTransactions must return the local transactions', () => {
        // Given
        const spyGet = jest.spyOn(LocalDB, 'get')
        spyGet.mockReturnValue(JSON.stringify(storagedTransactions))
        // When
        const transactions = getTransactions()
        // Then
        expect(transactions).toStrictEqual(storagedTransactions)
    })
    test('getTransactions must return an empty array if not transactions in local', () => {
        // Given
        const spyGet = jest.spyOn(LocalDB, 'get')
        spyGet.mockReturnValue(JSON.stringify(null))
        // When
        const transactions = getTransactions()
        // Then
        expect(transactions).toEqual([])
    })
    test('getTransactionById must call getUsers', () => {
        // Given
        const spygetUsers = jest.spyOn(TransactionsService, 'getTransactions')
        // When
        getTransactionById('sdasd-dsda-sadas')
        // Then
        expect(spygetUsers).toHaveBeenCalled()
    })
    test('getTransactionById must return a user with the specified id', () => {
        // Given
        const spygetUsers = jest.spyOn(TransactionsService, 'getTransactions')
        spygetUsers.mockReturnValue(storagedTransactions)
        // When
        const transaction = getTransactionById(storagedTransactions[0].id)
        // Then
        expect(transaction.id).toBe(storagedTransactions[0].id)
    })
    test('createTransaction must call LocalDB.create with TRANSACTIONS key and a array with the users', () => {
        // Given
        const spyGetUsers = jest.spyOn(TransactionsService, 'getTransactions')
        spyGetUsers.mockReturnValue([])
        const spyCreate = jest.spyOn(LocalDB, 'create')
        spyCreate.mockImplementation(() => {})
        // When
        const newTransaction = createTransaction(transactionWithoutId)
        // Then
        expect(spyCreate).toHaveBeenCalledWith(TRANSACTIONS, [newTransaction])
    })
    test('calculateTransactionAmount must return the total of the payments', () => {
        // When
        const amount = calculateTransactionAmount(transactionMapWithoutDebts)
        // Then
        expect(amount).toBe(80)
    })
    test('calculateTransactionDebts must a transactionMap with calculated debts', () => {
        // When
        const map = calculateTransactionDebts(transactionMapWithoutDebts)
        // Then
        expect(map).toEqual(transactionMap)
    })
})