export interface User{

    id : number,
    login : string,
    password : string,
    role : Role
}

export type Role = "ADMIN" ;

export interface LoginResponse {
    message: string,
    success:boolean,
    data :User|null
}