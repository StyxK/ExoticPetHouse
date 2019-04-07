import { Customer } from "../customer/customer.entity";
import { Order } from "../order/order.entity";
import { Store } from "../store/store.entity";


export class FeedbackDTO {

    id: string;
    score: number;
    comment: string;
    customer: Customer;
    order: Order;
    store: Store;
}