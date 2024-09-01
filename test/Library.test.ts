import { Library } from '../src/Library'; 
import { User, Role } from '../src/User';
import { Book } from '../src/Book';

describe('Library', () => {
    let library: Library;

    beforeEach(() => {
        library = new Library('Test Library2');
    });

    const librarian = new User('Dhruv', Role.LIBRARIAN);
    const user = new User('user', Role.USER);
    const book = new Book('9780132350884', 'Clean Code', 'Robert Cecil Martin', new Date());

    let timer: NodeJS.Timeout;

    afterEach(() => {
        timer = setTimeout(() => {
            library.addUser(librarian);
            library.addUser(user);
        }, 1000);
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
        expect(() => new Library('Dhr')).toThrow('Library Name Should have at least 4 characters');
    });

    test('should throw error if user is null', () => {
        expect(() => library.addUser(null as any)).toThrow('User should not be null');
    });

    test('should allow only permitted user to add book', () => {
        expect(() => library.addBook(librarian, book)).not.toThrow();
        expect(() => library.addBook(user, book)).toThrow('You are not authorized to add book');
    });

    test('should add user to library', () => {
        library.addUser(librarian);
        const user = library.getUserByName('Dhruv');

        expect(user).toEqual(librarian);
    });

    test('should not allow duplicate users', () => {
        const primaryLibrarian = new User('Dhruv', Role.LIBRARIAN);
        const secondaryLibrarian = new User('Dhruv', Role.LIBRARIAN);

        library.addUser(primaryLibrarian);
        expect(() => library.addUser(secondaryLibrarian)).toThrow('User already exists in catalog');
    });

    test('should fetch user by username', () => {
        const primaryLibrarian = new User('Dhruv', Role.LIBRARIAN);
        const secondaryLibrarian = new User('Dhruv', Role.LIBRARIAN);
    
        library.addUser(primaryLibrarian);
        const fetchedUser = library.getUserByName('Dhruv');

        expect(fetchedUser).toEqual(primaryLibrarian);
    });

    test('should retrieve all available books', () => {
        const book2 = new Book('9780134685991', 'Effective Java', 'Joshua Bloch', new Date());
        const librarian = new User('Dhruv', Role.LIBRARIAN);

        library.addUser(librarian);
        library.addBook(librarian, book);
        library.addBook(librarian, book2);

        const availableBooks = library.viewAvailableBooks();

        expect(availableBooks.size).toBe(2);
        expect(availableBooks.has('9780132350884')).toBe(true);
        expect(availableBooks.has('9780134685991')).toBe(true);
    });

    test('should return unmodifiable map', () => {
        library.addUser(librarian);
        library.addBook(librarian, book);

        const availableBooks = library.viewAvailableBooks();
    });

    test('should allow user to borrow book from library', () => {
        library.addUser(librarian);
        library.addUser(user);
        library.addBook(librarian, book);
    
        library.borrowBook(user, '9780132350884');

        const borrowedBook = library.getBookByISBN('9780132350884');
        expect(borrowedBook).toBeUndefined(); 
    });

    test('should throw error when book not found during borrow request', () => {
        library.addUser(user);
        expect(() => library.borrowBook(user, '9780132350884')).toThrow('Book not found');
    });

    test('should throw error when book is already borrowed', () => {
        const user2 = new User('user2', Role.USER);

        library.addUser(librarian);
        library.addUser(user);
        library.addUser(user2);
        library.addBook(librarian, book);

        library.borrowBook(user, '9780132350884');

        expect(() => library.borrowBook(user2, '9780132350884')).toThrow('Book is already borrowed');
    });

    test('should return borrower name who borrowed book', () => {
        library.addUser(librarian);
        library.addUser(user);
        library.addBook(librarian, book);

        library.borrowBook(user, '9780132350884');

        const borrowerName = library.getBorrowerNameByISBN('9780132350884');
        expect(borrowerName).toBe(user.getUserName());
    });

    test('should allow user to return book to library', () => {
        library.addUser(librarian);
        library.addUser(user);
        library.addBook(librarian, book);

        library.borrowBook(user, '9780132350884');
        library.returnBook(user, '9780132350884');

        const returnedBook = library.getBookByISBN('9780132350884');
        expect(returnedBook).toBeDefined(); 
    });

    test('should throw error when user returns book that is not borrowed by them', () => {
        const user2 = new User('user2', Role.USER);

        library.addUser(librarian);
        library.addUser(user);
        library.addUser(user2);
        library.addBook(librarian, book);

        library.borrowBook(user, '9780132350884');

        expect(() => library.returnBook(user2, '9780132350884')).toThrow('book was not borrowed by this user');
    });

    test('should throw error when no one borrowed book', () => {
        library.addUser(librarian);
        library.addUser(user);
        library.addBook(librarian, book);

        expect(() => library.returnBook(user, '9780132350884')).toThrow('book was not borrowed by any user');
    });
    
    test('should fetch user by username', () => {
        library.addUser(user);
        const fetchedUser = library.getUserByName(user.getUserName());
    
        expect(fetchedUser).toEqual(user);
    });

    it('should remove a book from the inventory', () => {
        library.addBook(librarian, book);
        library.removeBook('9780132350884');
        const fetchedBook = library.getBookByISBN('9780132350884');
        expect(fetchedBook).toBeUndefined();
    });
    
    test('should throw an error when trying to remove a non-existent book', () => {
        expect(() => library.removeBook('9788632383884')).toThrowError('Book not found');
    });
});