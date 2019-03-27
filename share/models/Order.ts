import { Store } from "./Store";

import { Customer } from "./Customer";

import { OrderLine } from "./OrderLine";

import { Feedback } from "./Feedback";

export class Order {
    id: string;
    transportation: string;
    submitDate: Date;
    startDate: Date;
    endDate: Date;
    store: Store;
    customer: Customer;
    orderLines: OrderLine[];
    feedback: Feedback;
}