import { useState } from "react";
import { IStep } from "src/common/components/steps_modal/StepsModal";

export const useSteps = (
    steps: IStep[], 
    onFinish: () => void, 
    closeModal: () => void,
    initialStep:number = 0
    ) => {
    const [activeStepIndex, setActiveStepIndex] = useState(initialStep);
    const prevStep = () => setActiveStepIndex(prev => Math.max(prev - 1, 0))
    const nextStep = () => {
        const isLastStep = activeStepIndex + 1 >= steps.length 
        setActiveStepIndex(prev => Math.min(prev + 1, steps.length - 1))
        if(isLastStep) {
            onFinish() 
            closeModal()
            setActiveStepIndex(0)
        }
    }
    const isActiveStep = (step:string) => steps[activeStepIndex].id === step
    return {prevStep, nextStep, isActiveStep, activeStepIndex, setActiveStepIndex}
}