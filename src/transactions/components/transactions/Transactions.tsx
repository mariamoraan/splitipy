import React, { useContext, useEffect, useMemo, useState } from 'react'
import { GroupContext } from 'src/groups/pages/GroupPage'
import { getTransactionById } from 'src/transactions/services/transactions'
import { TransactionCard } from '../transaction_card/TransactionCard'
import { compareDates } from 'src/common/utils/dates'
import styles from './Transactions.module.css'

export const Transactions = () => {
    const {group} = useContext(GroupContext)
    const [sortedTransactios, setSortedTransactions] = useState([])
    useEffect(() => {
        setSortedTransactions(
            group.transactions.map(transaction => getTransactionById(transaction)).sort((transaction1, transaction2) => compareDates(transaction1.date, transaction2.date))
        )
    }, [group])
    

    return (
        <ul className={styles.transactions_list}>
            {sortedTransactios.map(transaction => 
                <li key={transaction.id}>
                    <TransactionCard transaction={transaction} />
                </li>
            )}
        </ul>
    )
}