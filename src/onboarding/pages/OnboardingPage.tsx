import React, { useContext, useState } from 'react'
import { IStep, StepsModal } from 'src/common/components/steps_modal/StepsModal'
import { CREATE_USER, WELCOME } from '../constants/onboardingSteps'
import { CreateUser } from '../components/create_user/CreateUser'
import { WelcomeOnboarding } from '../components/welcome/WelcomeOnboarding'
import styles from './OnboardingPage.module.css'
import { createActiveUser } from 'src/users/services/users'
import { AppContext } from 'src/App'
import { useNavigate } from 'react-router-dom'

export const OnboardingPage = () => {
    const [name, setName] = useState('')
    const {setHasActiveUser} = useContext(AppContext)
    const navigate = useNavigate();

    const steps: IStep[] = [
        {
            id: WELCOME, 
            title: "Splitipy", 
            children: <WelcomeOnboarding />,
        },
        {
            id: CREATE_USER, 
            title: "Splitipy", 
            children: <CreateUser name={name} setName={setName} />,
            isNextStepAvailable: name!==''
        },

    ]

    const onFinish = () => {
        createActiveUser({name})
        setHasActiveUser(true)
        navigate('/groups')
    }
    const isOpen = true
    
    return (
        <div className={styles.wrapper}>
            <StepsModal 
                steps={steps}
                onFinish={onFinish}
                isModalOpen={isOpen}
                modalStyles={styles.modal}
            />
        </div>
    )
}