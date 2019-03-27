import { Pet } from "./Pet";
import { Address } from "./Address";
import { Order } from "./Order";
import { Feedback } from "./Feedback";
import { User } from "./User";

export class Customer extends User {
    phoneNumber: string;
    pets: Pet[];
    address: Address;
    orders: Order[];
    feedbacks: Feedback[];
}