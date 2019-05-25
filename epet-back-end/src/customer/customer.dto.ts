import { UserDTO, UserRO } from "../user/user.dto";
import { Address } from "../address/address.entity";

export interface CustomerDTO extends UserDTO{
}

export interface CustomerRO extends UserRO{
}