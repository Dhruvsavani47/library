import { Book } from '../src/Book'; // Assuming Book class is in a file named Book.ts

describe('Book', () => {
    test('should throw an exception when ISBN is null', () => {
        expect(() => new Book('', 'Clean Code', 'Robert Cecil Martin', new Date(2012, 0))).toThrow('ISBN should not be null or empty');
    });
});
