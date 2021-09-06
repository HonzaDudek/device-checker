import {User} from "./User";

export interface Phone {
    id: string,
    code: string,
    os: string,
    vendor: string,
    model: string,
    osVersion?: string,
    image?: string,
    borrowed: {
        user: User;
        date: Date
    }
}
