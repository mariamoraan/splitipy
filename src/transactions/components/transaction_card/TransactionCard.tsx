import React from 'react'
import { getDateString } from 'src/common/utils/dates'
import { ITransaction } from 'src/transactions/interfaces/transaction'
import styles from './TransactionCard.module.css'
import { getUserById } from 'src/users/services/users'
import { calculateTransactionAmount } from 'src/transactions/services/transactions'
import { UserIcon } from 'src/users/components/icon/UserIcon'

type Props = {
    transaction: ITransaction
}

export const TransactionCard = (props: Props) => {
    const {transaction} = props
    const movements = Object.keys(transaction.transactionMap).map(userId => ({user: getUserById(userId), pay: transaction.transactionMap[userId].pay, debt: transaction.transactionMap[userId].debt}))
    return (
        <div className={styles.wrapper}>
            <p className={styles.title}>{transaction.title}</p>
            <p className={styles.date}>{getDateString(new Date(transaction.date))}</p>
            <ul className={styles.movements}>
                {movements.map(({user, pay, debt}) => 
                    <li key={user.id}>
                        <UserIcon user={user} />
                        <p>
                            <span className={styles.user_name}>{user.name} </span>
                            ha pagado
                            <span className={styles.payment}> {pay}€ </span>
                            {debt < 0 ? 'y le deben': 'y debe'}
                            <span className={debt < 0 ? styles.payer : styles.debtor}> {Math.abs(debt)}€</span>
                        </p>
                    </li>
                    
                )}
            </ul>
            <p className={styles.total}>Total: {calculateTransactionAmount(transaction.transactionMap)}€</p>
        </div>
    )
}