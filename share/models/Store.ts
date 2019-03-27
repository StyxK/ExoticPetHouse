import { StoreOwner } from "./Owner";

import { Employee } from "./Employee";

import { Order } from "./Order";

import { Feedback } from "./Feedback";

export class Store {
    id: string;
    name: string;
    phoneNumber: string;
    description: string;
    maxOfDeposit: number;
    rating: number;
    owner: StoreOwner;
    employees: Employee[]
    address; Address;
    cages; Cage[]
    orders: Order[]
    feedbacks: Feedback[];
}