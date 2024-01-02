import React, { useContext, useEffect, useMemo } from 'react'
import { TransactionFormContext } from '../TransactionForm'
import styles from './TransactionFormPay.module.css'
import { GroupContext } from 'src/groups/pages/GroupPage'
import { getUserById } from 'src/users/services/users'
import { UserIcon } from 'src/users/components/icon/UserIcon'
import { TransactionRecord } from 'src/transactions/interfaces/transaction'

export const TransactionFormPay = () => {
    const {transaction, setTransaction} = useContext(TransactionFormContext)
    const {group} = useContext(GroupContext)

    const users = useMemo(() => {
        return group.users.map(id => getUserById(id))
    }, [group])

    useEffect(() => {
        const transactionMap: {[key: string]: TransactionRecord} = {}
        users.forEach(user => transactionMap[user.id] = {pay:0, debt: 0})
        setTransaction({...transaction, transactionMap})
    }, [users])

    const isUserInTransaction = (userId:string) => Object.keys(transaction.transactionMap).some(id => userId == id)
    const addUserToTransaction = (id: string) => setTransaction({
            ...transaction, 
            transactionMap: {...transaction.transactionMap, [id]: {pay: 0, debt: 0}}
    })
    const removeUserFromTransaction = (id: string) => {
        const newTransactionMap = {...transaction.transactionMap}
        delete newTransactionMap[id];
        setTransaction({
            ...transaction, 
            transactionMap: newTransactionMap
        })
    }

    const handleToggleUser = (isChecked: boolean, userId:string) => {
        if(isChecked) {
            addUserToTransaction(userId)
        } 
        
        else {
            removeUserFromTransaction(userId)
        }
    }

    const handleModifyUserPayment = (payment: string, userId: string) => {
        if(transaction.transactionMap[userId]?.pay === 0) payment = payment.replace('0','')
        setTransaction({...transaction, transactionMap: {...transaction.transactionMap, [userId]: {...transaction.transactionMap[userId], pay: parseFloat(payment)}}})
    }
    

    return (
        <div className={styles.wrapper}>
            <ul className={styles.transactions_list}>
                {users.map(user => 
                    <li key={user.id}>
                        <input 
                            type='checkbox'
                            checked={isUserInTransaction(user.id)}
                            onChange={(e) => handleToggleUser(e.target.checked, user.id)}
                        />
                        <UserIcon user={user} />
                        <span>{user.name}</span>
                        <input 
                            type='number'
                            className={styles.payment_input}
                            value={transaction.transactionMap[user.id]?.pay || 0}
                            onChange={e => handleModifyUserPayment(e.target.value, user.id)}
                        />
                        <span className={styles.currency}>€</span>
                    </li>
                )}
            </ul>
        </div>
    )
}