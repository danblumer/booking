import { LoggedUser } from "../types/Interfaces";

export const getLoggedUser = () :LoggedUser => {
    return {
        id: '1',
        name: 'John',
        lastName: 'Doe',
        email: 'johndoe@gmail.com'
    } as LoggedUser;
};