import React, { createContext, useContext, useState } from 'react'
import { IStep, StepsModal } from 'src/common/components/steps_modal/StepsModal'
import { GROUP_DATA } from 'src/groups/constants/group_form/steps'
import { GroupFormData } from './data/GroupFormData'
import { IGroup } from 'src/groups/interfaces/Group'
import { GroupFormContext } from 'src/groups/context/GroupFormContext'
import { BASE_GROUP_FORM } from 'src/groups/constants/group_form/baseGroupForm'
import { createGroup, getGroups } from 'src/groups/services/groups'
import { GroupsContext } from 'src/groups/context/GroupsContext'

type Props = {
    closeModal: () => void,
    isOpen: boolean,
}

export const GroupForm = (props: Props) => {
    const {closeModal, isOpen} = props
    const [group, setGroup] = useState<Omit<IGroup, 'id'>>(BASE_GROUP_FORM)
    const {setGroups} = useContext(GroupsContext)

    const clearForm = () => {
        setGroup(BASE_GROUP_FORM)
    }

    const onFinish = () => {
        const groups = getGroups()
        const newGroup = createGroup(group)
        setGroups([...groups, newGroup])
        clearForm()
    }

    const onClose = () => {
        clearForm()
        closeModal()
    }

    const hasColorAndName = !!group.color && !!group.name

    const steps: IStep[] = [
        {
            id: GROUP_DATA, 
            title: "Vamos a crear el grupo...", 
            children: <GroupFormData />,
            isNextStepAvailable: hasColorAndName
        },

    ]

    return (
        <GroupFormContext.Provider value={{group, setGroup}}>
            <StepsModal 
                steps={steps}
                onFinish={onFinish}
                closeModal={onClose}
                isModalOpen={isOpen}
                modalStyles=''
            />
        </GroupFormContext.Provider>
    )
}