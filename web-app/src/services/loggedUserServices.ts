import { LoggedUser } from "../types/Interfaces";

export const getLoggedUser = () :LoggedUser => {
    return {
        id: '1',
        name: 'John',
        lastName: 'Doe',
        email: ''
    } as LoggedUser;
};