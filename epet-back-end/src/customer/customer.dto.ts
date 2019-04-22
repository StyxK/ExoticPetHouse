import { UserDTO, UserRO } from "src/user/user.dto";
import { Address } from "src/address/address.entity";

export interface CustomerDTO extends UserDTO{
}

export interface CustomerRO extends UserRO{
}