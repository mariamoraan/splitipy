import React from 'react'
import { Modal } from '../modal/Modal'
import { useSteps } from 'src/common/hooks/steps_modal/useStepsModal'
import { StepsFooter } from './StepsFooter'
import { StepsHeader } from './StepsHeader'
import styles from './StepsModal.module.css'

export type IStep = {
    id: string,
    children: JSX.Element,
    title: string,
    isNextStepAvailable?: boolean,
    onNext?: () => void,
}

type Props = {
    steps: IStep[],
    onFinish: () => void,
    closeModal?: () => void,
    isModalOpen?: boolean,
    modalStyles?: string,
}

export const StepsModal = (props: Props) => {
    const {steps, onFinish, closeModal, isModalOpen=true, modalStyles} = props
    const {activeStepIndex, prevStep, nextStep, isActiveStep, setActiveStepIndex} = useSteps(steps, onFinish, closeModal)
    return (
        <Modal 
        isOpen={isModalOpen}
        className={`${styles.wrapper} ${modalStyles}`}
        >
            {
                closeModal ?
                <StepsHeader 
                    title={steps[activeStepIndex].title}
                    closeModal={() => {
                        closeModal()
                        setActiveStepIndex(0)
                    }}
                />
                : null
            }
            <div className={styles.form}>
                {steps[activeStepIndex].children}
            </div>
            <StepsFooter 
                activeStepIndex={activeStepIndex}
                prevStep={prevStep}
                nextStep={nextStep}
                isActiveStep={isActiveStep}
                steps={steps}
                isNextStepAvailable={steps[activeStepIndex].isNextStepAvailable}
            />
        </Modal>
    )
}