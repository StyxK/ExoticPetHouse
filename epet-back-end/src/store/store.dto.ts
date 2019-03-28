import { StoreOwner } from "src/storeowner/storeowner.entity";
import { Employee } from "src/employee/employee.entity";
import { Address } from "src/address/address.entity";
import { Cage } from "src/cage/cage.entity";
import { Order } from "src/order/order.entity";
import { Feedback } from "src/feedback/feedback.entity";

export interface StoreDTO{
    id:string
    name:string
    phoneNumber:string
    description:string
    maxOfDeposit:number
    rating:number
}