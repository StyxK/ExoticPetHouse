import { OrderLine } from "../orderline/orderline.entity";

export class PetActivityDTO {
    id: string;
    description: string;
    picture: string;
    orderLine: OrderLine;
}