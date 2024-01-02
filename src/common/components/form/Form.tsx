import React, { FormEvent } from 'react'
import styles from './Form.module.css'

export enum FormType {
    TEXT = 'text',
    DATE = 'date',
    COLOR = 'color'
}

type Props = {
    form: {
        type: FormType,
        name: string,
        label: string,
        placeholder?: string,
        value: string | number,
        setValue: (value: string | number) => void,
    }[],
    onSubmit: () => void,
    className?: string,
}

export const Form = (props: Props) => {
    const {form, onSubmit, className=''} = props
    const onSubmitForm = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        onSubmit()
    }
    return (
        <form 
        onSubmit={onSubmitForm}
        className={`${styles.form} ${className}`}
        >
            {
                form.map(({
                    type,
                    name,
                    label, 
                    placeholder,
                    value,
                    setValue
                }) => (
                    <label key={name}>
                        {label}
                        <input 
                        placeholder={placeholder}
                        type={type}
                        name={name}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        />
                    </label>
                ))
            }
        </form>
    )
}