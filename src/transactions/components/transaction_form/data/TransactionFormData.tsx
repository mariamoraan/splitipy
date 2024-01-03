import React, { useContext } from 'react'
import { Form, FormType } from 'src/common/components/form/Form'
import { TransactionFormContext } from '../TransactionForm'
import styles from './TransactionFormData.module.css'
import { getDateToYYYYMMDD } from 'src/common/utils/dates'

export const TransactionFormData = () => {
    const {transaction, setTransaction} = useContext(TransactionFormContext)
    const form = [
        {
            type:  FormType.TEXT,
            name: 'title',
            label: 'Título:',
            placeholder: 'Cena de Navidad',
            value: transaction.title,
            setValue: (title: string) => setTransaction({...transaction, title})
        },
        {
            type:  FormType.DATE,
            name: 'date',
            label: 'Fecha:',
            value: getDateToYYYYMMDD(new Date(transaction.date)),
            setValue: (date: string) => setTransaction({...transaction, date: getDateToYYYYMMDD(new Date(date))})
        },
    ]
    return (
        <Form 
            form={form} 
            className={styles.wrapper}
        />
    )
}