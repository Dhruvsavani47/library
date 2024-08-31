export class UnsupportedOperationException extends Error {
    constructor(message: string = 'Operation is not supported') {
        super(message);
        this.name = 'UnsupportedOperationException';
    }
}
