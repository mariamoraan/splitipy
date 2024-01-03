import {describe, expect, test, beforeEach, jest} from '@jest/globals';
import { LocalDB } from 'src/common/services/localDB';
import { getUsers, getUserById, createUser, getActiveUser, getActiveUserId, createActiveUser } from '../services/users';
import { ACTIVE_USER_IUD, USERS } from '../constants/keys';
import { IUser } from '../interfaces/user';
import * as UsersService from '../services/users'

const userWithoutId = {name: 'Maria', color: '#FFFFFF'}

const storagedUsers: IUser[] = [
    {...userWithoutId, id: 'sdasd-dsda-sadas'},
    {id: 'rtr-tr-3w3W', name: 'Elena', color: '#FFFFFF'},
]

describe('users service', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })
    test('getUsers must call LocalDB.get with USERS key', () => {
        // Given
        const spyGet = jest.spyOn(LocalDB, 'get')
        // When
        getUsers()
        // Then
        expect(spyGet).toHaveBeenCalledWith(USERS);
    })
    test('getUsers must return the local users', () => {
        // Given
        const spyGet = jest.spyOn(LocalDB, 'get')
        spyGet.mockReturnValue(JSON.stringify(storagedUsers))
        // When
        const users = getUsers()
        // Then
        expect(users).toStrictEqual(storagedUsers)
    })
    test('getUsers must return an empty array if not users in local', () => {
        // Given
        const spyGet = jest.spyOn(LocalDB, 'get')
        spyGet.mockReturnValue(JSON.stringify(null))
        // When
        const users = getUsers()
        // Then
        expect(users).toEqual([])
    })
    test('getUserById must call getUsers', () => {
        // Given
        const spygetUsers = jest.spyOn(UsersService, 'getUsers')
        // When
        getUserById('sdasd-dsda-sadas')
        // Then
        expect(spygetUsers).toHaveBeenCalled()
    })
    test('getUserById must return a user with the specified id', () => {
        // Given
        const spygetUsers = jest.spyOn(UsersService, 'getUsers')
        spygetUsers.mockReturnValue(storagedUsers)
        // When
        const group = getUserById('sdasd-dsda-sadas')
        // Then
        expect(group.id).toBe('sdasd-dsda-sadas')
      
    })
    test('createUser must call LocalDB.create with USERS key and a array with the users', () => {
        // Given
        const spyGetUsers = jest.spyOn(UsersService, 'getUsers')
        spyGetUsers.mockReturnValue([])
        const spyCreate = jest.spyOn(LocalDB, 'create')
        spyCreate.mockImplementation(() => {})
        // When
        const newUser = createUser(userWithoutId)
        // Then
        expect(spyCreate).toHaveBeenCalledWith(USERS, [newUser])
    })
    test('getActiveUserId must call LocalDB.get with ACTIVE_USER_IUD', () => {
        // Given
        const spyGet = jest.spyOn(LocalDB, 'get')
        // When
        getActiveUser()
        // Then
        expect(spyGet).toHaveBeenCalledWith(ACTIVE_USER_IUD)
    })
    test('getActiveUserId must return active user id, saved in ACTIVE_USER_IUD', () => {
        // Given
        const ACTIVE_USER_ID = "dsds-dsd-sda"
        const spyGet = jest.spyOn(LocalDB, 'get')
        spyGet.mockReturnValue(JSON.stringify(ACTIVE_USER_ID))
        // When
        const activeUserId = getActiveUserId()
        // Then
        expect(activeUserId).toBe(ACTIVE_USER_ID)
    })
    test('createActiveUser must call  LocalDB.create with ACTIVE_USER_IUD and user id', () => {
        // Given
        const spyCreate = jest.spyOn(LocalDB, 'create')
        spyCreate.mockImplementation(() => {})
        // When
        const activeUser = createActiveUser(userWithoutId)
        // Then
        expect(spyCreate).toHaveBeenCalledWith(ACTIVE_USER_IUD, activeUser.id)
    })
})