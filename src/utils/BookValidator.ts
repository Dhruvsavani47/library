import { Book } from '../Book'; 
import { BookNotFoundException } from '../exceptions/BookNotFoundException';

export class BookValidator {
    public static validateBookNotNull(book: Book | null, message: string): void {
        if (book === null) {
            throw new BookNotFoundException(message);
        }
    }
}
