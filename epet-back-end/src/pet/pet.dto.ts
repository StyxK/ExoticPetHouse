import { Customer } from "../customer/customer.entity";
import { OrderLine } from "../orderline/orderline.entity";

export interface PetDTO {
    id: string;
    name: string;
    typeOfPet: string;
    age: number;
    gender: string;
    congenitalDisease: string;
    allergicDrugs: string;
    allergicFoods: string;
    favThing: string;
    hateThing: string;
    image: string;
    wasDeposit: boolean;
    owner: Customer;
    orderLines: OrderLine[];
}