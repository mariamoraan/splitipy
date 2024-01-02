import React, { useEffect, useState } from 'react'
import { useModal } from 'src/common/hooks/modal/useModal'
import { GroupForm } from '../components/group_form/GroupForm'
import { getGroups } from '../services/groups'
import { GroupsContext } from '../context/GroupsContext'
import { Header } from '../components/header/Header'
import { Groups } from '../components/groups/Groups'
import { useNavigation } from 'react-router-dom'

export const GroupsPage = () => {
    const [groups, setGroups] = useState([])
    const {closeModal, openModal, isOpen} = useModal()
    const navigate = useNavigation()
    useEffect(() => {
        setGroups(getGroups())
    }, [])
    
    return (
        <GroupsContext.Provider value={{
            groups,
            setGroups
        }}>
            <Header openModal={openModal} />
            <Groups />
            <GroupForm
                closeModal={closeModal}
                isOpen={isOpen}
            />
        </GroupsContext.Provider>
    )
}