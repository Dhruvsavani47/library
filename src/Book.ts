import { StringValidator } from './utils/StringValidator'; // Assuming StringValidator is in utils/StringValidator.ts

export class Book {
    private isbn: string;
    private title: string;
    private author: string;
    private publicationYear: Date;

    constructor(isbn: string, title: string, author: string, publicationYear: Date) {
        this.validateRequiredAttributes(isbn, title, author, publicationYear);

        this.isbn = isbn;
        this.title = title;
        this.author = author;
        this.publicationYear = publicationYear;
    }

    private validateRequiredAttributes(isbn: string, title: string, author: string, publicationYear: Date): void {
        StringValidator.validateString(isbn, 'ISBN should not be null or empty');
        StringValidator.validateString(title, 'title should not be null or empty');
        StringValidator.validateString(author, 'author should not be null or empty');
        if (publicationYear == null) {
            throw new Error('publication year should not be null');
        }
    }
    
    public getISBN(): string {
        return this.isbn;
    }

    public equals(object: any): boolean {
        if (this === object) return true;
        if (object == null || (this.constructor !== object.constructor)) return false;
        const book = object as Book;

        return this.isbn === book.isbn;
    }

    public hashCode(): number {
        let hash = 0;
        for (let i = 0; i < this.isbn.length; i++) {
            const char = this.isbn.charCodeAt(i);
            hash = (hash << 5) - hash + char;
            hash |= 0; 
        }

        return hash;
    }    
}
