import { USER_COLORS } from "../constants/colors"

export const generateUserColor = ():string => {
    const maxIndex = USER_COLORS.length - 1
    const index = Math.floor(Math.random() * maxIndex)
    console.log(`maxIndex: ${maxIndex}, index: ${index}`)
    return USER_COLORS[index]
}