import { Pet } from "./Pet";

import { Order } from "./Order";

import { PetActivity } from "./PetActivity";

export class OrderLine {
    id: string;
    transportation: string;
    submitDate: Date;
    pets: Pet[]
    order: Order;
    activitys: PetActivity[]
}