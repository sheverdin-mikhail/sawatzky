export interface User {
    id: string;
    username: string;
    fio?: string;
    client?: any;
    performer?: any;
    phone_number?: string;
}

export interface UserAuthData extends User {

}



export interface UserSchema {
    authData?: UserAuthData;
    _inited?: boolean;
}