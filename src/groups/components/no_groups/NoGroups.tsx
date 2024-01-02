import React from 'react'
import styles from './NoGroups.module.css'

export const NoGroups = () => {
    return (
        <div className={styles.wrapper}>
            <img
                alt='Papeles vacíos'
                src='assets/no_data.png'
            />
            <p>Parece que aún no tienes ningún grupo creado</p>
        </div>
    )
}