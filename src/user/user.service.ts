import {User} from "../user/user.entity"
let sails: any
export  class UserService{

    static async create(newUser:User){
        let result = await sails.model.user.em.create(newUser,{
            raw: true
        })
        
        return result
    }

   static async findByEmail(email:string){
        const user =  await sails.model.user.em.findOne({
             where:{
                 email
             }
         })
     
         return user
     
    }

    static async unifiedUpdate(id:string, newUser){
        await sails.models.user.em.unifiedUpdate({
            _id:id
        }, newUser)
    }


    static async update(newUser: User){
        newUser = await sails.models.user.em.update(newUser, {
            where:{
                _id: newUser._id
                }
            })

            return newUser
    }


    static async UpdateMongoPayId(mangoPayUserId:any,newUser: User){
        newUser = await sails.models.user.em.update(newUser, {
            mangoPayUserId,
            where:{
                _id: newUser._id
                }
            })

            return newUser
    }

    static async UpdateCagnotteId(cagnotteId:any, newUser: User){
        newUser = await sails.models.user.em.update({
            cagnotteId,
        },{
            where:{
                _id: newUser._id
            }
        })

        return newUser
    }

    
    
}


