import {
    isUser
} from "../interfaces/users.interface";

export class UsersLib implements isUser {
    constructor(
        public username: string,
        public name: string,
        public password: string,
        readonly users_id?: any
    ) { }
    get getUser() {
        return {
            username: this.username,
            name: this.name,
            users_id: this.users_id
        }
    }
}