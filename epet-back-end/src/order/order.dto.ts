import { OrderLine } from "../orderline/orderline.entity";
import { Customer } from "../customer/customer.entity";
import { Store } from "../store/store.entity";
import { OrderStatus } from "./order.status.entity";

export interface OrderDTO {
    id:string
    transportation:string
    submitDate:Date
    store:Store
    startDate:Date
    endDate:Date
    orderLines: OrderLine[]
    customer:Customer
    OrderStatus:OrderStatus
}