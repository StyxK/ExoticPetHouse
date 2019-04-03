import { UserDTO } from "src/user/user.dto";
import { Store } from "src/store/store.entity";

export interface EmployeeDTO extends UserDTO{
    store:Store
}