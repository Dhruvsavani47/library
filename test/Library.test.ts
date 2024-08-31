import { Library } from '../src/Library'; 
import { User } from '../src/User';
import { Book } from '../src/Book';

describe('Library', () => {
    let library: Library;

    beforeEach(() => {
        library = new Library('Dhruv');
    });

    test('should create a library instance', () => {
        expect(library).toBeDefined();
    });

    test('should throw error if library name is null', () => {
        expect(() => new Library(null as any)).toThrow('Library Name Should not be null or empty');
    });

    test('should throw error if library name is empty', () => {
        expect(() => new Library('')).toThrow('Library Name Should not be null or empty');
    });

    test('should throw error if library name has less than 4 characters', () => {
        expect(() => new Library('Dhru')).toThrow('Library Name Should have at least 4 characters');
    });

    test('should throw error if user is null', () => {
        expect(() => library.addUser(null as any)).toThrow('User should not be null');
    });
});