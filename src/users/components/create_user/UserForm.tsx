import React, { createContext, useState } from 'react'
import { IUser } from 'src/users/interfaces/user'
import { BASE_USER } from 'src/users/constants/base_user'
import { UserFormData } from './data/UserFormData'
import { USER_NAME } from 'src/users/constants/form'
import { IStep, StepsModal } from 'src/common/components/steps_modal/StepsModal'
import { createUser } from 'src/users/services/users'
import styles from './UserForm.module.css'

export const UserFormContext = createContext({
    user: BASE_USER,
    setUser: (user: Omit<IUser, 'id'>) => {}
})

type Props = {
    closeModal: () => void,
    isOpen: boolean,
}


export const UsersForm = (props:Props) => {
    const {closeModal, isOpen} = props
    const [user, setUser] = useState<Omit<IUser, 'id'>>(BASE_USER)
    const hasName = !!user.name

    const steps: IStep[] = [
        {
            id: USER_NAME, 
            title: "Vamos a crear un usuario nuevo...", 
            children: <UserFormData />,
            isNextStepAvailable: hasName
        },
    ]

    const clearForm = () => {
        setUser(BASE_USER)
    }

    const onFinish = () => {
        createUser(user)
        clearForm()
    }

    const onClose = () => {
        clearForm()
        closeModal()
    }
    
    return (
        <UserFormContext.Provider value={{user, setUser}}>
            <StepsModal 
                steps={steps}
                onFinish={onFinish}
                closeModal={onClose}
                isModalOpen={isOpen}
                modalStyles={styles.modal}
            />
        </UserFormContext.Provider>
    )
}