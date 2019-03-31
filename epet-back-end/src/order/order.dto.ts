import { OrderLine } from "src/orderline/orderline.entity";
import { Feedback } from "src/feedback/feedback.entity";
import { Customer } from "src/customer/customer.entity";

export interface OrderDTO {
    id:string
    transportation:string
    submitDate:Date
    startDate:Date
    endDate:Date
    orderLines: OrderLine
    feedbacks: Feedback
    customer:Customer
}