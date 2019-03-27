import { Customer } from "./Customer";

import { Order } from "./Order";

import { Store } from "./Store";

export class Feedback {
    id: string;
    score: number;
    comment: string;
    customer: Customer
    order: Order;
    store: Store
}