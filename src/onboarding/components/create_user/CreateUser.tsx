import React from 'react'
import { Form, FormType } from 'src/common/components/form/Form'
import styles from './CreateUser.module.css'

type Props = {
    name: string,
    setName: (name: string) => void
}

export const CreateUser = (props: Props) => {
    const {name, setName} = props
    
    const form = [
        {
            type:  FormType.TEXT,
            name: 'name',
            label: '¿Cómo te llamas?',
            placeholder: 'Maria',
            value: name,
            setValue: (name: string) => setName(name)
        },
    ]
    return (
        <div className={styles.wrapper}>
            <img 
                src='assets/enter.png'
                alt=''
            />
            <h1></h1>
            <Form 
                form={form}
            />
        </div>
    )
}