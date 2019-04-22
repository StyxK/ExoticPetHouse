import {IsNotEmpty} from 'class-validator'

export class UserDTO{

    @IsNotEmpty()
    userName: string
    @IsNotEmpty()
    password: string
}

export interface UserRO{
    userName:string
    firstName:string
    lastName:string
    email: string
    token?:string
}