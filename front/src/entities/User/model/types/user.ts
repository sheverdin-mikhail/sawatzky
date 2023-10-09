export interface User {
    id: string;
    username: string;
    fio?: string;
    employee?: any;
    phone_number?: string;
}


export interface UserSchema {
    data?: User;
    _inited?: boolean;
}