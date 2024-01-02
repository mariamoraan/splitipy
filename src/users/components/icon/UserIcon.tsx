import React from 'react'
import styles from './UserIcon.module.css'
import { IUser } from 'src/users/interfaces/user'

type Props = {
    user: IUser
}

export const UserIcon = (props:Props) => {
    const {user} = props
    return (
        <span
        className={styles.wrapper}
        style={{background: user.color}}
        >
            {user.name[0]}
        </span>
    )
}