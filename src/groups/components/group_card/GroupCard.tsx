import React from 'react'
import styles from './GroupCard.module.css'
import { IGroup } from 'src/groups/interfaces/Group'
import { NavigateNext } from '@mui/icons-material'

type Props = {
    group: IGroup
}

export const GroupCard = (props:Props) => {
    const {group} = props
    return (
        <div
        className={styles.group_card}
        style={{background: group.color}}
        >
            <p className={styles.group_name}>{group.name}</p>
            <NavigateNext />
        </div>
    )
}