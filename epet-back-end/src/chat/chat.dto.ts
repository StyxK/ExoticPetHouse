import { Order } from 'src/order/order.entity';

export interface ChatDTO {
    id:string,
    message:string,
    order:Order
    role:number
    time:number
}