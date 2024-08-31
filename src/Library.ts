import { User } from './User'; 
import { Book } from './Book'; 
import { UserExistsException } from './exceptions/UserExistsException'; 
import { PermissionDeniedException } from './exceptions/PermissionDeniedException';
import { UserValidator } from './utils/UserValidator';
import { StringValidator } from './utils/StringValidator'; 
import { BookValidator } from './utils/BookValidator'; 

export class Library {
    private name: string;
    private readonly bookInventory: Map<string, Book>;
    private readonly userCatalog: Map<string, User>;
    private readonly borrowedBooks: Map<string, string>;
    private readonly borrowedBookDetails: Map<string, Book>;

    constructor(name: string) {
        StringValidator.validateString(name, 'Library Name Should not be null or empty');
        if (name.length <= 4) {
            throw new Error('Library Name Should have at least 4 characters');
        }
        this.name = name;
        this.bookInventory = new Map<string, Book>();
        this.userCatalog = new Map<string, User>();
        this.borrowedBooks = new Map<string, string>();
        this.borrowedBookDetails = new Map<string, Book>();
    }

    public addUser(user: User): void {
        UserValidator.validateUser(user, 'User should not be null');
        if (this.userCatalog.has(user.getUserName())) {
            throw new UserExistsException('User already exists in catalog');
        }
        this.userCatalog.set(user.getUserName(), user);
    }

    public getUserByName(userName: string): User | undefined {
        return this.userCatalog.get(userName);
    }


    public addBook(user: User, book: Book): void {
        UserValidator.validateUser(user, 'User should not be null');
        BookValidator.validateBookNotNull(book, 'Book not found');
        if (user.isPermittedToAddBook()) {
            this.bookInventory.set(book.getISBN(), book);
        } else {
            throw new PermissionDeniedException('You are not authorized to add book');
        }
    }
}
