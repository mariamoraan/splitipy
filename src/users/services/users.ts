import { generateUid } from "src/common/utils/generateUid";
import { IUser } from "../interfaces/user";
import { LocalDB } from "src/common/services/localDB";
import { ACTIVE_USER_IUD, USERS } from "../constants/keys";
import { generateUserColor } from "./color";

export const getUsers = ():IUser[] => {
    const users: IUser[] = JSON.parse(LocalDB.get(USERS)) as IUser[] || []
    return users
}   

export const getUserById = (id: string) => getUsers().find(user => user.id === id)

export const createUser = (user: Omit<IUser, 'id' | 'color'>) => {
    const newUser: IUser = {...user, id: generateUid(), color: generateUserColor()}
    const currentUsers: IUser[] = getUsers()
    currentUsers.push(newUser)
    LocalDB.create(USERS, currentUsers)
    return newUser
}
export const getActiveUserId = () => JSON.parse(LocalDB.get(ACTIVE_USER_IUD)) || null
export const getActiveUser = ():IUser => getUserById(getActiveUserId())

export const createActiveUser = (user: Omit<IUser, 'id' | 'color'>) => {
    const newUser = createUser(user)
    LocalDB.create(ACTIVE_USER_IUD, newUser.id)
}

