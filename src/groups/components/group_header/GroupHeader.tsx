import React, { useContext } from 'react'
import { IGroup } from 'src/groups/interfaces/Group'
import styles from './GroupHeader.module.css'
import { UserIcon } from 'src/users/components/icon/UserIcon'
import { getUserById } from 'src/users/services/users'
import { ArrowBack } from '@mui/icons-material'
import { useNavigate } from "react-router-dom";
import { GroupContext } from 'src/groups/pages/GroupPage'

export const GroupHeader = () => {
    const {group} = useContext(GroupContext)
    const navigate = useNavigate();

    return (
        <div 
        className={styles.wrapper}
        style={{background: group.color}}
        >
            <ArrowBack onClick={() => navigate(-1)} />
            <h1 className={styles.name}>{group.name}</h1>
            <ul className={styles.users}>
                {
                    group.users.map(user => <UserIcon key={user} user={getUserById(user)} />).slice(0, Math.min(group.users.length, 4))
                }
                {group.users.length > 4 ? '...' : null}
            </ul>
        </div>
    )
}