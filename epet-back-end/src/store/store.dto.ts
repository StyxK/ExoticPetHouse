import { Address } from "src/address/address.entity";
import { StoreOwner } from "src/storeowner/storeowner.entity";

export interface StoreDTO{
    id:string
    name:string
    phoneNumber:string
    description:string
    maxOfDeposit:number
    rating:number
    address:Address
    owner:StoreOwner
}