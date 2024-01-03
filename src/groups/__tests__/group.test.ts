import {describe, expect, test, beforeEach, jest} from '@jest/globals';
import { GROUPS } from '../constants/group_form/keys';
import { getGroupById, getGroups, createGroup } from '../services/groups';
import { IGroup } from '../interfaces/Group';
import * as GroupsService from '../services/groups'
import { LocalDB } from 'src/common/services/localDB';


const groupId = 'adsd-sdaaswdsa-asdsad'
const groupWithoutId: Omit<IGroup, 'id'> = {
    name: 'Amigos',
    color: '#DCF2F1',
    image: '',
    transactions: [],
    users: []
}
const group: IGroup = {
    id: groupId,
    ...groupWithoutId
} 
const storagedGroups: IGroup[] = [
    group,
    {...group, id: 'rerewr-dsdfsd-trhh'}
]


describe('groups service', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })
    test('getGroups must call LocalDB.get with GROUPS key', () => {
        // Given
        const spyGet = jest.spyOn(LocalDB, 'get')
        // When
        getGroups()
        // Then
        expect(spyGet).toHaveBeenCalledWith(GROUPS);
    })
    test('getGroups must return the local groups', () => {
        // Given
        const spyGet = jest.spyOn(LocalDB, 'get')
        spyGet.mockReturnValue(JSON.stringify(storagedGroups))
        // When
        const groups = getGroups()
        // Then
        expect(groups).toStrictEqual(storagedGroups)
    })
    test('getGroups must return an empty array if not groups in local', () => {
        // Given
        const spyGet = jest.spyOn(LocalDB, 'get')
        spyGet.mockReturnValue(JSON.stringify(null))
        // When
        const groups = getGroups()
        // Then
        expect(groups).toEqual([])
    })
    test('getGroupById must call getGroups', () => {
        // Given
        const spygetGroups = jest.spyOn(GroupsService, 'getGroups')
        // When
        getGroupById('sdsd-dsds-dsdsd')
        // Then
        expect(spygetGroups).toHaveBeenCalled()
    })
    test('getGroupById must return a group with the specified id', () => {
        // Given
        const spygetGroups = jest.spyOn(GroupsService, 'getGroups')
        spygetGroups.mockReturnValue(storagedGroups)
        // When
        const group = getGroupById(groupId)
        // Then
        expect(group.id).toBe(groupId)
      
    })
    test('createGroup must call LocalDB.create with GROUP key and a array with the groups', () => {
         // Given
        const spygetGroups = jest.spyOn(GroupsService, 'getGroups')
        spygetGroups.mockReturnValue([])
        const spyCreate = jest.spyOn(LocalDB, 'create')
        spyCreate.mockImplementation(() => {})
        // When
        const newGroup = createGroup(groupWithoutId)
        // Then
        expect(spyCreate).toHaveBeenCalledWith(GROUPS, [newGroup])
    })
})