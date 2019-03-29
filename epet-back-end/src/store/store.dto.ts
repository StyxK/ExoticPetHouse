import { Address } from "src/address/address.entity";

export interface StoreDTO{
    id:string
    name:string
    phoneNumber:string
    description:string
    maxOfDeposit:number
    rating:number
    address:Address
}