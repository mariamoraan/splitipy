import { USER_COLORS } from "../constants/colors"

export const generateUserColor = ():string => {
    const maxIndex = USER_COLORS.length - 1
    const index = Math.floor(Math.random() * maxIndex)
    return USER_COLORS[index]
}