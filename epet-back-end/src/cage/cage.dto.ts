import { Store } from "../store/store.entity";
import { CageType } from './cage.type.entity';
import { Cage } from "./cage.entity";

export interface CageDTO{
    id: string;
    typeName: string;
    description: string;
    cages: Cage[];
    price: number;
    quantity: number;
    hasCamera: boolean;
    storeId: string;
    store: Store;
}