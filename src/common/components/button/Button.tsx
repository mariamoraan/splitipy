import React from 'react'
import styles from './Button.module.css'

type Props = {
    onClick: () => void;
    children: any;
    className?: string;
}

export const Button = (props: Props) => {
    const {onClick, children, className=''} = props;
    return (
        <button 
        className={`${styles.button} ${className}`}
        onClick={() => onClick()}
        >
            {children}
        </button>
    )
}