import React, { useContext, useState } from 'react'
import { Form, FormType } from 'src/common/components/form/Form'
import { GroupFormContext, IGroupFormContext } from 'src/groups/context/GroupFormContext'
import styles from './GroupFormData.module.css'

export const GroupFormData = () => {
    const {group, setGroup} = useContext<IGroupFormContext>(GroupFormContext)
    const onSubmit = () => {

    }
    const form = [
        {
            type:  FormType.TEXT,
            name: 'name',
            label: 'Nombre:',
            placeholder: 'Cumpleaños de Cris',
            value: group.name,
            setValue: (name: string) => setGroup({...group, name})
        },
        {
            type:  FormType.COLOR,
            name: 'color',
            label: 'Color:',
            value: group.color,
            setValue: (color: string) => setGroup({...group, color})
        },
    ]
    return (
        <Form 
        form={form} 
        onSubmit={onSubmit} 
        className={styles.group_form_data}
        />
    )
}