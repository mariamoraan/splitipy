import { Add } from '@mui/icons-material';
import React from 'react'
import { Button } from 'src/common/components/button/Button';
import styles from './Header.module.css'

type Props = {
    openModal: () => void,
}

export const Header = (props: Props) => {
    const {openModal} = props
    return (
        <div className={styles.wrapper}>
            <h1>Tus Grupos</h1>
            <Button onClick={openModal}><Add /> Nuevo</Button>
        </div>
    )
}