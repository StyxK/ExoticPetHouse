import { UserDTO } from "src/user/user.dto";
import { Address } from "src/address/address.entity";

export interface CustomerDTO extends UserDTO{
    phoneNumber:string
    address:Address
}