import { IUser } from "../interfaces/user";

export const BASE_USER:Omit<IUser, 'id'> = {
    name: '',
    color: '',
}