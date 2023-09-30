import { EntityState } from '@ngrx/entity'

export interface Users{
    name:string,
    email:string,
    password:string
}

export interface Usercred{
    email:string,
    password:string
}

export interface UserModel extends EntityState<Users>{
    
}