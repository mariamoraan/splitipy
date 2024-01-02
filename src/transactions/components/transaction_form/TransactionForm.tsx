import React, { createContext, useContext, useState } from 'react'
import { Button } from 'src/common/components/button/Button'
import { IStep, StepsModal } from 'src/common/components/steps_modal/StepsModal'
import { useModal } from 'src/common/hooks/modal/useModal'
import { GroupContext } from 'src/groups/pages/GroupPage'
import { BASE_TRANSACTION } from 'src/transactions/constants/base_transaction'
import { TRANSACTION_DATA, TRANSACTION_PAY } from 'src/transactions/constants/form'
import { ITransaction } from 'src/transactions/interfaces/transaction'
import { calculateTransactionDebts, createTransaction } from 'src/transactions/services/transactions'
import { TransactionFormData } from './data/TransactionFormData'
import styles from './TransactionForm.module.css'
import { TransactionFormPay } from './pay/TransactionFormPay'
import { modifyGroup } from 'src/groups/services/groups'

export const TransactionFormContext = createContext({
    transaction: BASE_TRANSACTION,
    setTransaction: (transaction: Omit<ITransaction, 'id'>) => {}
})

export const TransactionForm = () => {
    const {closeModal, openModal, isOpen} = useModal()
    const {group, setGroup} = useContext(GroupContext)
    const [transaction, setTransaction] = useState<Omit<ITransaction, 'id'>>(BASE_TRANSACTION)

    const clearForm = () => {
        setTransaction(BASE_TRANSACTION)
    }

    const onFinish = () => {
        const newTransaction = createTransaction({...transaction, transactionMap: calculateTransactionDebts(transaction.transactionMap)})
        setGroup(modifyGroup(group.id, {transactions: [...group.transactions, newTransaction.id]}))
    }

    const onClose = () => {
        clearForm()
        closeModal()
    }

    const hasTitleAndDate = transaction.title && !!transaction.date
    const hasAtLeastOnePayer = Object.values(transaction.transactionMap).some(({pay}) => pay > 0)

    const steps: IStep[] = [
        {
            id: TRANSACTION_DATA, 
            title: "Vamos a crear la transacción...", 
            children: <TransactionFormData />,
            isNextStepAvailable: hasTitleAndDate
        },
        {
            id: TRANSACTION_PAY, 
            title: "¿Quién pagó cuánto?", 
            children: <TransactionFormPay />,
            isNextStepAvailable: hasAtLeastOnePayer
        },
    ]

    return (
        <div className={styles.wrapper}>
            <Button 
                children={'Nueva transacción'}
                onClick={openModal}
            />
            <TransactionFormContext.Provider value={{transaction, setTransaction}}>
                <StepsModal 
                    steps={steps}
                    onFinish={onFinish}
                    closeModal={onClose}
                    isModalOpen={isOpen}
                    modalStyles={styles.modal}
                />
            </TransactionFormContext.Provider>
        </div>
    )
}