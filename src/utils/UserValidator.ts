import { User } from '../User'; 

export class UserValidator {
    public static validateUser(user: User | null, message: string): void {
        if (user === null) {
            throw new Error(message);
        }
    }
}
