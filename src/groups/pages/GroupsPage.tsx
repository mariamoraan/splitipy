import React, { useEffect, useState } from 'react'
import { useModal } from 'src/common/hooks/modal/useModal'
import { GroupForm } from '../components/group_form/GroupForm'
import { getGroups } from '../services/groups'
import { GroupsContext } from '../context/GroupsContext'
import { Header } from '../components/header/Header'
import { Groups } from '../components/groups/Groups'
import { NoGroups } from '../components/no_groups/NoGroups'

export const GroupsPage = () => {
    const [groups, setGroups] = useState([])
    const {closeModal, openModal, isOpen} = useModal()
    useEffect(() => {
        setGroups(getGroups())
    }, [])
    
    return (
        <GroupsContext.Provider value={{
            groups,
            setGroups
        }}>
            <div className='flex-column'>
                <Header openModal={openModal} />
                {groups.length > 0 ? <Groups /> : <NoGroups />}
                <GroupForm
                    closeModal={closeModal}
                    isOpen={isOpen}
                />
            </div>
        </GroupsContext.Provider>
    )
}