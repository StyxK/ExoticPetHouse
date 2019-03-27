import { Customer } from "./Customer";

import { OrderLine } from "./OrderLine";

export class Pet {
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
    wasDeposit: boolean;
    owner: Customer;
    orderLines: OrderLine[];
}