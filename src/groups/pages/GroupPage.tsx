import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { IGroup, IMinimalPayment } from '../interfaces/Group'
import { BASE_GROUP_FORM } from '../constants/group_form/baseGroupForm'
import { getGroupById, getMinimalNecessaryMovements } from '../services/groups'
import { GroupHeader } from '../components/group_header/GroupHeader'
import { TransactionForm } from 'src/transactions/components/transaction_form/TransactionForm'
import { Transactions } from 'src/transactions/components/transactions/Transactions'
import { MinimalPayments } from '../components/minimal_payments/MinimalPayments'
import { AppContext } from 'src/App'

export const GroupContext = createContext({
    group: {...BASE_GROUP_FORM, id: ''},
    setGroup: (group: IGroup) => {},
})

export const GroupPage = () => {
    const {state} = useLocation()
    const navigate = useNavigate();
    const {hasActiveUser} = useContext(AppContext)

    const [group, setGroup] = useState<IGroup>({...BASE_GROUP_FORM, id: state.id})

    useEffect(() => {
         if(!hasActiveUser) navigate('/onboarding')
        setGroup(getGroupById(state.id))
    }, [])

    const minimalPayments = useMemo<IMinimalPayment[]>(() => {
        return getMinimalNecessaryMovements(group)
    }, [group])

    return (
        <GroupContext.Provider value={{group, setGroup}}>
            <div
            className='height-100 overflow-hidden'
            >
                <GroupHeader />
                { group?.transactions.length > 0 ? <MinimalPayments minimalPayments={minimalPayments} /> : null}
                <TransactionForm />
                <Transactions />
            </div>
        </GroupContext.Provider>
    )
}