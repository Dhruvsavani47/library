import { Book } from '../src/Book';

describe('Book', () => {
    test('should throw an exception when ISBN is null', () => {
        expect(() => new Book('', 'Clean Code', 'Robert Cecil Martin', new Date(2012, 0))).toThrow('ISBN should not be null or empty');
    });

    test('should throw an exception when title is null', () => {
        expect(() => new Book('9780132350884', '', 'Robert Cecil Martin', new Date(2012, 0))).toThrow('title should not be null or empty');
    });

    test('should throw an exception when author is empty', () => {
        expect(() => new Book('9780132350884', 'Clean Code', '', new Date(2012, 0))).toThrow('author should not be null or empty');
    });

    test('should throw an exception when publication year is null', () => {
        expect(() => new Book('9780132350884', 'Clean Code', 'Robert Cecil Martin', null as any)).toThrow('publication year should not be null');
    });
});
