import {describe, expect, test} from '@jest/globals';
import { compareDates, getDateString, getDateToYYYYMMDD } from '../utils/dates';
import { generateUid } from '../utils/generateUid';

describe('users service module', () => {
    test('getDateToYYYYMMDD must return date in format YYYY-MM-DD', () => {
        // Given
        const cases = [
            {input: new Date('2024-10-2'), expected: '2024-10-02'},
            {input: new Date('2024-9-12'), expected: '2024-09-12'},
            {input: new Date('2024-5-9'), expected: '2024-05-09'},
            {input: new Date('2024-12-10'), expected: '2024-12-10'},
        ]
        // When/Then
        cases.forEach(({input, expected}) => expect(getDateToYYYYMMDD(input)).toBe(expected))
    })  
    test('getDateString must return date in format DD-mon-YYYY', () => {
         // Given
         const cases = [
            {input: new Date('2024-10-2'), expected: '02 oct 2024'},
            {input: new Date('2024-2-9'), expected: '09 feb 2024'},
            {input: new Date('2024-2-10'), expected: '10 feb 2024'},
        ]
        // When/Then
        cases.forEach(({input, expected}) => expect(getDateString(input)).toBe(expected))
    })
    test('compareDates must return -1 if date1 > date 2, 1 if date1 < date 2 and 0 if equals', () => {
        // Given
        const cases = [
            {date1: new Date('2024-12-10'), date2: new Date('2024-10-2'), expected: -1},
            {date1: new Date('2024-10-5'), date2: new Date('2024-12-1'), expected: 1},
            {date1: new Date('2024-10-2'), date2: new Date('2024-10-2'), expected: 0},
        ]
        // When/Then
        cases.forEach(({date1, date2, expected}) => expect(compareDates(date1, date2)).toBe(expected))
    })
    test("generateUid must return a string", () => {
        // When
        const uid = generateUid()
        // Then
        expect(typeof uid).toBe('string')
    })
})