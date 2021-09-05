import {User} from "../user/user.entity"
export class MailService{
    static async sendEmailConfirmation(newUser:User){}

    static async sendUserCreated(email:string, {user:User}){

    }
   
}