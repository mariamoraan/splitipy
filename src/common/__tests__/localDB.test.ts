import {describe, expect, test, beforeEach, jest} from '@jest/globals';
import { LocalDB } from '../services/localDB';

const FAKE_ID = 'sdssa-dass-asdsa-das'
const value = {key: 'asas-sasA', value: 'HOLA'}

describe('localDB module', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })
    test('LocalDB.delete must call localStorage.removeItem', () => {
        // Given
        const spyRemoveItem = jest.spyOn(Storage.prototype, 'removeItem')
        spyRemoveItem.mockImplementation((key: string) => {})
        // When
        LocalDB.delete(FAKE_ID)
        // Then
        expect(spyRemoveItem).toHaveBeenCalledWith(FAKE_ID);
    })  
    test('LocalDB.get must call localStorage.getItem', () => {
        // Given
        const spyGetItem = jest.spyOn(Storage.prototype, 'getItem')
        // When
        LocalDB.get(FAKE_ID)
        // Then
        expect(spyGetItem).toHaveBeenCalledWith(FAKE_ID);
    })  
    test('LocalDB.create must call localStorage.setItem', () => {
        // Given
        const spySetItem = jest.spyOn(Storage.prototype, 'setItem')
        spySetItem.mockImplementation((key: string, value: string) => {})
        // When
        LocalDB.create(FAKE_ID, value)
        // Then
        expect(spySetItem).toHaveBeenCalledWith(FAKE_ID, JSON.stringify(value));
    })  
})