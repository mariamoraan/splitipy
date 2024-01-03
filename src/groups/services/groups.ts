import { generateUid } from "src/common/utils/generateUid";
import { IGroup, IMinimalPayment } from "../interfaces/Group";
import { LocalDB } from "src/common/services/localDB";
import { GROUPS } from "../constants/group_form/keys";
import { getTransactionById } from "src/transactions/services/transactions";
import { getUserById } from "src/users/services/users";


export const getGroups = ():IGroup[] => {
    const groups: IGroup[] = JSON.parse(LocalDB.get(GROUPS)) as IGroup[] || []
    return groups
}   

export const getGroupById = (id: string) => getGroups().find(group => group.id === id)

export const createGroup = (group: Omit<IGroup, 'id'>, id:string = '') => {
    const newGroup: IGroup = {...group, id: id ? id : generateUid()}
    const currentGroups: IGroup[] = getGroups()
    LocalDB.create(GROUPS, [...currentGroups, newGroup])
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

export const calculateTotalDebts = (group: IGroup) => {
    const {users} = group
    const transactionMaps = group.transactions.map(id => getTransactionById(id).transactionMap)
    const debts = []
    users.forEach(userId => {
        const debt = transactionMaps.reduce((prev, transactionMap) => prev + transactionMap[userId].debt , 0)
        debts.push({user: userId, debt})
    })
    return debts
}

export const getMinimalNecessaryMovements = (group: IGroup): IMinimalPayment[] => {
    const totalDebts = calculateTotalDebts(group)
    const debtors = totalDebts.filter((debt) => debt.debt > 0)
    const payers = totalDebts.filter((debt) => debt.debt < 0)
    
    let debtorIndex = 0
    let payerIndex = 0

    const paysMap = {}
    const paysArray = []

    for(debtorIndex = 0; debtorIndex < debtors.length ; debtorIndex++) {
        const debtorDebt = debtors[debtorIndex].debt
        const debtorId = debtors[debtorIndex].user

        for(payerIndex = 0; payerIndex < payers.length ; payerIndex++) {
            const payerId = payers[payerIndex].user
            const payerExced = payers[payerIndex].debt
            if(Math.abs(payerExced) > 0.01 && debtorDebt > 0) {
                const amount = Math.min(Math.abs(payerExced), debtorDebt)
                payers[payerIndex].debt = payers[payerIndex].debt + amount
                debtors[debtorIndex].debt =  debtors[debtorIndex].debt - amount 
                paysMap[debtorId] = paysMap[debtorId] ? [...paysMap[debtorId], {amount, to:  payerId, from: debtorId}] : [{amount, to:  payerId, from: debtorId}]
            }
        }
        paysArray.push(...paysMap[debtorId])
    }
    return paysArray
}