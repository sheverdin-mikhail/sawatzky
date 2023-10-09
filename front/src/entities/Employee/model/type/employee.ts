import { User } from "entities/User";

export interface Employee extends Omit<User, 'employee'>{
    
}