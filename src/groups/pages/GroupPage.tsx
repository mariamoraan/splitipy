import React, { createContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { IGroup } from '../interfaces/Group'
import { BASE_GROUP_FORM } from '../constants/group_form/baseGroupForm'
import { getGroupById } from '../services/groups'
import { GroupHeader } from '../components/group_header/GroupHeader'
import { TransactionForm } from 'src/transactions/components/transaction_form/TransactionForm'
import { Transactions } from 'src/transactions/components/transactions/Transactions'

export const GroupContext = createContext({
    group: {...BASE_GROUP_FORM, id: ''},
    setGroup: (group: IGroup) => {},
})

export const GroupPage = () => {
    const {state} = useLocation()
    const [group, setGroup] = useState<IGroup>({...BASE_GROUP_FORM, id: state.id})

    useEffect(() => {
        setGroup(getGroupById(state.id))
    }, [])

    return (
        <GroupContext.Provider value={{group, setGroup}}>
            <div
            className='height-100 overflow-hidden'
            >
                <GroupHeader />
                <TransactionForm />
                <Transactions />
            </div>
        </GroupContext.Provider>
    )
}