import React, { useContext, useEffect, useState } from 'react'
import { useModal } from 'src/common/hooks/modal/useModal'
import { GroupForm } from '../components/group_form/GroupForm'
import { getGroups } from '../services/groups'
import { GroupsContext } from '../context/GroupsContext'
import { Header } from '../components/header/Header'
import { Groups } from '../components/groups/Groups'
import { NoGroups } from '../components/no_groups/NoGroups'
import { AppContext } from 'src/App'
import { useNavigate } from 'react-router-dom'

export const GroupsPage = () => {
    const [groups, setGroups] = useState([])
    const navigate = useNavigate();
    const {closeModal, openModal, isOpen} = useModal()
    const {hasActiveUser} = useContext(AppContext)
    
    useEffect(() => {
        if(!hasActiveUser) navigate('/onboarding')
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