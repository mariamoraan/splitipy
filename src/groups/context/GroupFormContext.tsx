import React, { createContext } from 'react'
import { IGroup } from '../interfaces/Group'
import { BASE_GROUP_FORM } from '../constants/group_form/baseGroupForm'

export type IGroupFormContext = {
    group: Omit<IGroup, 'id'>
    setGroup: (group: Omit<IGroup, 'id'>) => void,
}

export const GroupFormContext = createContext<IGroupFormContext>({
    group: BASE_GROUP_FORM,
    setGroup: () => {}
})