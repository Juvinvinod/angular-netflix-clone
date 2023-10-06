export interface User{
    name:string,
    email:string,
    password:string,
    token:string,
    role:string,
}

export interface UserCredentials{
    email:string,
    password:string
}