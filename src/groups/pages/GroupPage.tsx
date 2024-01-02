import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { IGroup } from '../interfaces/Group'
import { BASE_GROUP_FORM } from '../constants/group_form/baseGroupForm'
import { getGroupById } from '../services/groups'

export const GroupPage = () => {
    const {state} = useLocation()
    const [group, setGroup] = useState<IGroup>({...BASE_GROUP_FORM, id: state.id})

    useEffect(() => {
        setGroup(getGroupById(state.id))
    }, [])

    return (
        <div>
            <h1>{group.name}</h1>
        </div>
    )
}