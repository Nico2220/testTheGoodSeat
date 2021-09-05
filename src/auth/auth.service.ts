import {User} from "../user/user.entity"
export class AuthService{
    static async beforeCreate(user:User){
        //.....
        return user
    }
}