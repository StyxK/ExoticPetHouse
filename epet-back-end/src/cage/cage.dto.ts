import { Store } from "../store/store.entity";

export interface CageDTO{
    id:string
    name:string
    type:string
    description:string
    price:number
    store:Store
}