import { Close } from '@mui/icons-material'
import React from 'react'
import styles from './StepsHeader.module.css'

type Props = {
    title: string,
    closeModal: () => void,
}

export const StepsHeader = (props:Props) => {
    const {title, closeModal} = props
    return (
        <div className={styles.steps_header}>
            <p>{title}</p>
            <button className={styles.close_steps_button} onClick={() => closeModal()}><Close /></button>
        </div>
    )
}