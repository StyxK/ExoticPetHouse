import { Customer } from '../customer/customer.entity';
import { Store } from '../store/store.entity';

export interface ChatDTO {
    id:string,
    message:string,
    customer:Customer
    store:Store
    role:number
    time:number
}