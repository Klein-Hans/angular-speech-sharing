import { User } from '../../users/models/user';

export interface Group {
    id: number;
    code: string;
    user: string;
}