export class BookAlreadyBorrowedException extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'BookAlreadyBorrowedException';
    }
}
