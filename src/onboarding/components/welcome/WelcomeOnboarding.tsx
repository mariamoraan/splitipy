import React from 'react'
import styles from './WelcomeOnboarding.module.css'

export const WelcomeOnboarding = () => {
    return (
        <div className={styles.wrapper}>
            <img 
            src='assets/welcome.png' 
            alt='Unos gatitos muy majos te dan la bienvenida'
            />
            <h1 className={styles.title}>Welcome !</h1>
            <p className={styles.text}>Estamos encantados de tenerte en Splitipy. ¡No vuelvas a romperte la cabeza nunca con tus gastos en grupo!</p>
        </div>
    )
}