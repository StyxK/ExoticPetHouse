import { UserDTO } from "../user/user.dto";
import { Store } from "../store/store.entity";

export interface EmployeeDTO extends UserDTO{
    store:Store
}