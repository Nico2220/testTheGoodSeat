import {User} from "../user/user.entity"
let sails:any
export class PaymentService{
    static async getMangoPayUserId(newUser){}

    static async createCagnotte(amount=0, newUser:User){
       let result= await sails.models.cagnotte.em.create({
            amount,
            userId: newUser._id
        }, {
            raw: true
        })

        return result
    }

}