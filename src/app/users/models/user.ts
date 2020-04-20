import { UserType } from './user-type'

export interface User {
    id: number;
    userType: UserType;
    name: string;
    username: string;
    password: string;
}