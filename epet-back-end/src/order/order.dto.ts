import { OrderLine } from "src/orderline/orderline.entity";
import { Customer } from "src/customer/customer.entity";
import { Store } from "src/store/store.entity";

export interface OrderDTO {
    transportation:string
    submitDate:Date
    store:Store
    startDate:Date
    endDate:Date
    orderLines: OrderLine[]
    customer:Customer
}