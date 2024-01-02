import React, { useContext } from 'react'
import { UserFormContext } from '../UserForm'
import { Form, FormType } from 'src/common/components/form/Form'
import styles from './UserFormData.module.css'


export const UserFormData = () => {
    const {user, setUser} = useContext(UserFormContext)
    const form = [
        {
            type:  FormType.TEXT,
            name: 'name',
            label: 'Nombre:',
            placeholder: 'Maria',
            value: user.name,
            setValue: (name: string) => setUser({...user, name})
        },
    ]
    return (
        <div className={styles.wrapper}>
            <Form 
            form={form} 
            />
        </div>
    )
}