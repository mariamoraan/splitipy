import React, { useContext } from 'react'
import { GroupContext } from 'src/groups/pages/GroupPage'
import { TransactionCard } from '../transaction_card/TransactionCard'
import styles from './Transactions.module.css'
import { useTransactions } from 'src/transactions/hooks/useTransactions'

export const Transactions = () => {
    const {group} = useContext(GroupContext)
    const {orderedTransactions} = useTransactions(group.transactions);
    

    return (
        <ul className={styles.transactions_list}>
            {orderedTransactions.map(transaction => 
                <li key={transaction.id}>
                    <TransactionCard transaction={transaction} />
                </li>
            )}
        </ul>
    )
}