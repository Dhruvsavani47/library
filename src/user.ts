enum Role {
    LIBRARIAN,
    USER
}

class User {
    private userName: string;
    private role: Role;

    constructor(userName: string, role: Role) {
        this.userName = userName;
        this.role = role;
    }

    getUserName(): string {
        return this.userName;
    }

    getRole(): Role {
        return this.role;
    }

    isPermittedToAddBook(): boolean {
        return this.role === Role.LIBRARIAN;
    }
}
