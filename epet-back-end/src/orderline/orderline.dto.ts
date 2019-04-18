import { Order } from "../order/order.entity";
import { Pet } from "../pet/pet.entity";
import { PetActivity } from "../petactivity/petactivity.entity";

export class OrderLineDTO {
    transportation: string;
    submitDate: Date;
    pet: Pet;
    order: Order;
    activitys: PetActivity[];
}