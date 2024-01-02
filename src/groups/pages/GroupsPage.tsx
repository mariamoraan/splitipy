import React, { useContext, useEffect, useState } from 'react'
import { useModal } from 'src/common/hooks/modal/useModal'
import { GroupForm } from '../components/group_form/GroupForm'
import { getGroups } from '../services/groups'
import { GroupsContext } from '../context/GroupsContext'
import { Header } from '../components/header/Header'
import { Groups } from '../components/groups/Groups'
import { AppContext } from 'src/App'

export const GroupsPage = () => {
    const [groups, setGroups] = useState([])
    const {setHasActiveUser} = useContext(AppContext)
    const {closeModal, openModal, isOpen} = useModal()
    useEffect(() => {
        setGroups(getGroups())
    }, [])
    
    return (
        <GroupsContext.Provider value={{
            groups,
            setGroups
        }}>
            <button onClick={() => localStorage.clear()}>Clear</button>
            <button onClick={() => setHasActiveUser(false)}>Cerrar sesión</button>
            <Header openModal={openModal} />
            <Groups />
            <GroupForm
                closeModal={closeModal}
                isOpen={isOpen}
            />
        </GroupsContext.Provider>
    )
}