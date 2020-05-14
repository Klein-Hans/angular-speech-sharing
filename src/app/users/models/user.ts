import { Role } from './role';

export interface User {
    uid: string;
    email: string;
    password?: string;
    photoURL?: string;
    phoneNumber? : string;
    signInMethod : string;
    displayName: string;
    role: Role;
    createdDate: any;
    updatedDate: any;
}