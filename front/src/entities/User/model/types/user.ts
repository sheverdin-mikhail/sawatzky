export interface User {
    id: string;
    username: string;
    client?: any;
    performer?: any;
    phone_number?: string;
}

export interface UserAuthData extends User, TokensData {

}


export interface TokensData {
    access: string;
    refresh: string;
}

export interface UserSchema {
    authData?: UserAuthData;
}