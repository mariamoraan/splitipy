import { ChevronLeft, Done, NavigateNext } from '@mui/icons-material'
import React from 'react'
import styles from './StepsFooter.module.css'
import { IStep } from './StepsModal'

type Props = {
    activeStepIndex: number,
    prevStep: () => void,
    nextStep: () => void,
    isActiveStep: (id: string) => boolean,
    steps: IStep[],
    isNextStepAvailable?: boolean
}

export const StepsFooter = (props: Props) => {
    const {activeStepIndex, prevStep, isActiveStep, nextStep, steps, isNextStepAvailable=true} = props;
    const isLastStep = activeStepIndex < steps.length - 1
    return (
        <div className={styles.steps_footer}>
            {activeStepIndex > 0 ? <button className={styles.prev_button} onClick={() => prevStep()}><ChevronLeft /></button> : null}
            {steps.length > 1 && steps.map(step => <span key={step.id} className={isActiveStep(step.id) ? `${styles.progress_circle_fill}` : `${styles.progress_circle}`}></span>)}
            <button 
            className={
                isNextStepAvailable 
                ? `${styles.next_button}` 
                : `${styles.next_button} ${styles.disabled}`
            }
            onClick={() => nextStep()}
            disabled={!isNextStepAvailable}
            
            >
                {isLastStep ? <NavigateNext /> : <Done />}
            </button>
        </div>
    )
}