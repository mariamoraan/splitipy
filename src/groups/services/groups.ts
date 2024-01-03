import { generateUid } from "src/common/utils/generateUid";
import { IGroup } from "../interfaces/Group";
import { LocalDB } from "src/common/services/localDB";
import { GROUPS } from "../constants/group_form/keys";


export const getGroups = ():IGroup[] => {
    const groups: IGroup[] = JSON.parse(LocalDB.get(GROUPS)) as IGroup[] || []
    return groups
}   

export const getGroupById = (id: string) => getGroups().find(group => group.id === id)

export const createGroup = (group: Omit<IGroup, 'id'>, id:string = '') => {
    const newGroup: IGroup = {...group, id: id ? id : generateUid()}
    const currentGroups: IGroup[] = getGroups()
    currentGroups.push(newGroup)
    LocalDB.create(GROUPS, currentGroups)
    return newGroup
}

export const removeGroup = (id: string) => {
    const currentGroups = getGroups()
    LocalDB.create(GROUPS, currentGroups.filter(group => group.id !== id))
}

export const modifyGroup = (id: string, modifications: Partial<IGroup>): IGroup => {
    const currentGroup = getGroupById(id)
    if(!currentGroup) return
    const newGroup = {...currentGroup, ...modifications}
    removeGroup(id)
    createGroup(newGroup, id)
    return newGroup
}