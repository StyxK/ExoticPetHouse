import { Store } from "../store/store.entity";
import { CageType } from './cage.type.entity';

export interface CageDTO{
    id:string
    name:string
    cageType:CageType
    description:string
    price:number
    store:Store
}