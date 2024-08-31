import { Library } from '../src/Library'; 
import { User, Role } from '../src/User';
import { Book } from '../src/Book';
import { UserExistsException } from '../src/exceptions/UserExistsException'; 
import { BookNotFoundException } from '../src/exceptions/BookNotFoundException'; 
import { PermissionDeniedException } from '../src/exceptions/PermissionDeniedException';
import { BookAlreadyBorrowedException } from '../src/exceptions/BookAlreadyBorrowedException';
import { UnsupportedOperationException } from '../src/exceptions/UnsupportedOperationException ';

describe('Library', () => {
    let library: Library;
    beforeEach(() => {
        library = new Library('Test Library2');
    });

    let timer: NodeJS.Timeout;

    afterEach(() => {
        timer = setTimeout(() => {
            library.addUser(librarian);
            library.addUser(regularUser);
        }, 1000);
    });

    const librarian = new User('librarian', Role.LIBRARIAN);
    const regularUser = new User('user', Role.USER);
    const book = new Book('9780132350884', 'Clean Code', 'Robert Cecil Martin', new Date());

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

    test('should add user to library', () => {
        library.addUser(librarian);
        const user = library.getUserByName('Dhruv');

        expect(user).toEqual(librarian);
    });

    const primaryLibrarian = new User('Dhruv', Role.LIBRARIAN);
    const secondaryLibrarian = new User('Dhruv', Role.LIBRARIAN);

    test('should not allow duplicate users', () => {
        library.addUser(primaryLibrarian);
        expect(() => library.addUser(secondaryLibrarian)).toThrow('User already exists in catalog');
    });

    test('should fetch user by username', () => {
        library.addUser(primaryLibrarian);
        const fetchedUser = library.getUserByName('Dhruv');

        expect(fetchedUser).toEqual(primaryLibrarian);
    });

    const book1 = new Book('9780132350884', 'Clean Code', 'Robert Cecil Martin', new Date());
    const book2 = new Book('9780134685991', 'Effective Java', 'Joshua Bloch', new Date());
    const librarian2 = new User('Dhruv', Role.LIBRARIAN);

    test('should retrieve all available books', () => {

        library.addUser(librarian2);
        library.addBook(librarian2, book1);
        library.addBook(librarian2, book2);

        const availableBooks = library.viewAvailableBooks();

        expect(availableBooks.size).toBe(2);
        expect(availableBooks.has('9780132350884')).toBe(true);
        expect(availableBooks.has('9780134685991')).toBe(true);
    });

    const librarian3 = new User('Dhruv', Role.LIBRARIAN);
    const book3 = new Book('9780132350884', 'Clean Code', 'Robert Cecil Martin', new Date());

    test('should return unmodifiable map', () => {
        library.addUser(librarian3);
        library.addBook(librarian3, book3);

        const availableBooks = library.viewAvailableBooks();
    });

    const librarian4 = new User('Dhruv', Role.LIBRARIAN);
    const user2 = new User('user', Role.USER);
    const book4 = new Book('9780132350884', 'Clean Code', 'Robert Cecil Martin', new Date());

    test('should allow user to borrow book from library', () => {

        library.addUser(librarian4);
        library.addUser(user2);
        library.addBook(librarian4, book4);

    
        library.borrowBook(user2, '9780132350884');

        const borrowedBook = library.getBookByISBN('9780132350884');
        expect(borrowedBook).toBeUndefined(); 
    });

    const user3 = new User('user', Role.USER);

    test('should throw error when book not found during borrow request', () => {

        library.addUser(user3);
        expect(() => library.borrowBook(user3, '9780132350884')).toThrow('Book not found');
    });

    const librarian5 = new User('Dhruv', Role.LIBRARIAN);
    const user4 = new User('user1', Role.USER);
    const user5 = new User('user2', Role.USER);
    const book5 = new Book('9780132350884', 'Clean Code', 'Robert Cecil Martin', new Date());

    test('should throw error when book is already borrowed', () => {

        library.addUser(librarian5);
        library.addUser(user4);
        library.addUser(user5);
        library.addBook(librarian5, book5);

        library.borrowBook(user4, '9780132350884');

        expect(() => library.borrowBook(user5, '9780132350884')).toThrow('Book is already borrowed');
    });

    const librarian6 = new User('Dhruv', Role.LIBRARIAN);
    const user6 = new User('user', Role.USER);
    const book6 = new Book('9780132350884', 'Clean Code', 'Robert Cecil Martin', new Date());

    test('should return borrower name who borrowed book', () => {

        library.addUser(librarian6);
        library.addUser(user6);
        library.addBook(librarian6, book6);

        library.borrowBook(user6, '9780132350884');

        const borrowerName = library.getBorrowerNameByISBN('9780132350884');
        expect(borrowerName).toBe(user6.getUserName());
    });

    const librarian7 = new User('Dhruv', Role.LIBRARIAN);
    const user7 = new User('user', Role.USER);
    const book7 = new Book('9780132350884', 'Clean Code', 'Robert Cecil Martin', new Date());

    test('should allow user to return book to library', () => {

        library.addUser(librarian7);
        library.addUser(user7);
        library.addBook(librarian7, book7);

        library.borrowBook(user7, '9780132350884');
        library.returnBook(user7, '9780132350884');

        const returnedBook = library.getBookByISBN('9780132350884');
        expect(returnedBook).toBeDefined(); 
    });

    const librarian8 = new User('Dhruv', Role.LIBRARIAN);
    const user8 = new User('user8', Role.USER);
    const user9 = new User('user9', Role.USER);
    const book8 = new Book('9780132350884', 'Clean Code', 'Robert Cecil Martin', new Date());

    test('should throw error when user returns book that is not borrowed by them', () => {

        library.addUser(librarian8);
        library.addUser(user8);
        library.addUser(user9);
        library.addBook(librarian8, book8);

        library.borrowBook(user8, '9780132350884');

        expect(() => library.returnBook(user9, '9780132350884')).toThrow('book was not borrowed by this user');
    });

    const librarian9 = new User('Dhruv', Role.LIBRARIAN);
    const user10 = new User('user', Role.USER);
    const book9 = new Book('9780132350884', 'Clean Code', 'Robert Cecil Martin', new Date());

    test('should throw error when no one borrowed book', () => {

        library.addUser(librarian9);
        library.addUser(user10);
        library.addBook(librarian9, book9);

        expect(() => library.returnBook(user10, '9780132350884')).toThrow('book was not borrowed by any user');
    });
});