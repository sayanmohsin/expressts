import { UsersLib } from "../libraries/users.library";

export const createUser = async (
    newUser: {
        username: string,
        name: string,
        password: string
    }): Promise<object> => {
    try {
        let createdUser: object =
            new UsersLib(newUser.username, newUser.name, newUser.password);
        return createdUser;
    } catch (err) {
        throw err;
    }
}

