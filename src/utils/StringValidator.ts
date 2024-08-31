export class StringValidator {
    public static validateString(value: string, message: string): void {
        if (value == null || value.trim().length === 0) {
            throw new Error(message);
        }
    }
}
