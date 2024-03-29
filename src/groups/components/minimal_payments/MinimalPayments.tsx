import React from 'react'
import { IMinimalPayment } from 'src/groups/interfaces/Group'
import { getUserById } from 'src/users/services/users'
import styles from './MinimalPayments.module.css'

type Props = {
    minimalPayments: IMinimalPayment[]
}

export const MinimalPayments = (props: Props) => {
    const {minimalPayments} = props
    return (
        <div className={styles.wrapper}>
            <h2>Summary</h2>
            <ul>
                {minimalPayments
                .map(({from, to, amount}) => <li key={`${from}-${to}`}><p>{getUserById(from).name} paga {amount}€ a {getUserById(to).name}</p></li>)
            }
            </ul>
        </div>
    )
}