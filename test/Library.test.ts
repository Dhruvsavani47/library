import { Library } from '../src/Library'; 
import { User, Role } from '../src/User';
import { Book } from '../src/Book';

describe('Library', () => {
    let library: Library;
    const librarian = new User('librarian', Role.LIBRARIAN);
    const regularUser = new User('user', Role.USER);
    const book = new Book('9780132350884', 'Clean Code', 'Robert Cecil Martin', new Date());

    beforeEach(() => {
        library = new Library('Test Library');
        library.addUser(librarian);
        library.addUser(regularUser);
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

    test('should allow only permitted user to add book', () => {
        expect(() => library.addBook(librarian, book)).not.toThrow();
        expect(() => library.addBook(regularUser, book)).toThrow('You are not authorized to add book');
    });

    
});