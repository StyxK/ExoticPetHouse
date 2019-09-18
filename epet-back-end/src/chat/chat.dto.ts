import { Customer } from 'src/customer/customer.entity';
import { Store } from 'src/store/store.entity';

export interface ChatDTO {
    id:string,
    message:string,
    customer:Customer
    store:Store
    role:number
    time:number
}