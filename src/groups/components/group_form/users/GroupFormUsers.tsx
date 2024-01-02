import React, { useContext, useEffect } from 'react'
import { GroupFormContext, IGroupFormContext } from 'src/groups/context/GroupFormContext'
import { getActiveUserId, getUsers } from 'src/users/services/users'
import styles from './GroupFormUsers.module.css'
import { Button } from 'src/common/components/button/Button'
import { useModal } from 'src/common/hooks/modal/useModal'
import { UsersForm } from 'src/users/components/create_user/UserForm'

export const GroupFormUsers = () => {
    const {group, setGroup} = useContext<IGroupFormContext>(GroupFormContext)
    const {closeModal, openModal, isOpen} = useModal()
    const users = getUsers()

    const isUserInGroup = (userId: string):boolean => group.users.some(id => id === userId)
    const isActiveUser = (userId: string):boolean => getActiveUserId()  === userId
    const addUserToGroup = (id: string) => setGroup({...group, users: Array.from(new Set([...group.users, id]))})
    const removeUserFromGroup = (id: string) => setGroup({...group, users: group.users.filter(userId => userId !== id)})

    useEffect(() => {
        addUserToGroup(getActiveUserId())
    }, [])

    

    return (
        <ul className={styles.users_list}>
            <Button
            children={'Añadir amigo'}
            onClick={openModal}
            />
            <UsersForm 
            closeModal={closeModal}
            isOpen={isOpen}
            />
            {users.map(user => 
                <li 
                key={user.id}>
                    <input 
                    type='checkbox' 
                    checked={isActiveUser(user.id) || isUserInGroup(user.id)}
                    onChange={(e) => e.target.checked ? addUserToGroup(user.id) : removeUserFromGroup(user.id)}
                    />
                    <span>{user.name}</span>
                </li>
            )}
        </ul>
    )
}