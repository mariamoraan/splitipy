import React from 'react'
import styles from './Modal.module.css'

type Props = {
    children: JSX.Element | JSX.Element[],
    isOpen: boolean,
    className?: string, 
}

export const Modal = (props: Props) => {
    const {children, isOpen, className=""} = props;
    if(!isOpen) return null;
    return ( 
        <div className={`${styles.modal} ${className}`}>
            {children}
        </div>
    )
}