import {UserService} from "./user.service"
import {AuthService} from "../auth/auth.service"
import {MailService} from "../email/email.service"
import {PaymentService} from "../payment/payment.service"
import { validationError } from "./validationError"
class userController{
    async create(req:any, res:any){
        let sails: any
        let token: string
        if(!req.body.email){
            return validationError(res,"error_missing_email")
        }
    
        if(!req.body.password){
            return validationError(res, "error_missing_password")
        }
    
        if(!req.body.username){
            return validationError(res, "error_missing_username")
    
        }
    
        req.body.username = req.body.email
    
        let userExistant;
        let newUser = req.body
        newUser.email = newUser.email.toLowerCase()
        newUser.username = newUser.username.toLowerCase()
    
        
       let user = await UserService.findByEmail(newUser.email)
    
        if(user){
            if(req.body.fromBo === true){
                return validationError(res, "error_missing_username")
            }
        }
    
        userExistant = user
        newUser.roles = JSON.stringify(["USER"])
        newUser.isActive = true
    
        if(newUser.activationToken){
            delete newUser.activationToken;
        }
    
        if(!userExistant.country){
            newUser.country = "France"
        }
    
    
       userExistant = await UserService.unifiedUpdate(userExistant.id, newUser)
    
        user = await UserService.findByEmail(userExistant.email)
        
        let jwToken: any
        let ResponseTransformer:any
    
        token = jwToken.generateFor(user)
        
        res.status(200).json({
           user: ResponseTransformer.user(user),
           token,
           update:true
       })
    
       if(!newUser.roles){
           newUser.roles = JSON.stringify(["USER"])
       }
    
       
       let data =  await AuthService.beforeCreate(newUser)
    
       if(!data){
        throw new Error("password_encoding_error")
       }
       
        let result:any = UserService.create(newUser)
        
        if(!(result && result.dataVaues)){
            return validationError(res, "user_not_created")
            
        }
        
        newUser = result.dataValues
    
        if(newUser.roles && typeof newUser.roles ==="string"){
            try{
                newUser.roles = JSON.parse(newUser.roles);
            }catch(e){
                sails.tracer.warn(e)
            }
        }
    
        token = jwToken.generateFor(newUser);
    
        if (newUser.activationToken) { 
            delete newUser.activationToken;
        }
    
        newUser = UserService.update(newUser)
    
        
    
        if(newUser && newUser._id && sails.config.enyo.user.emailConfirmationRequired){
            return await MailService.sendEmailConfirmation(newUser)
        }
    
        let mangoPayUserId: any
        
        mangoPayUserId = sails.config.environment === "test"? 11111 : await PaymentService.getMangoPayUserId(newUser)
        newUser.mangoPayUserId = mangoPayUserId
        
        newUser = await UserService.UpdateMongoPayId(mangoPayUserId, newUser)  
        result = PaymentService.createCagnotte(0, newUser)
    
        if(!(result && result.dataValues)){
            throw new Error("error_cagnotte_creation")
        }
    
        newUser.cagnotteId = result.dataValues._id
    
        newUser = await UserService.UpdateCagnotteId(result.dataValues._id, newUser)
    
       if(newUser._id){
           try{
                await MailService.sendUserCreated(newUser.email, {
                    user: newUser
                })
                res.status(200).json({
                    user: ResponseTransformer.user(newUser),
                    token
                })
    
           }catch(err){
               let Tools
            sails.tracer.warn(err && err.message ? err.message: err)
            Tools.errorCallback(err, res);
    
           }
          
    
          
       }else{
           res.status(503).json({
               error: ["user_not_saved"],
               message: "user_not_save"
           })
       }
    
    }

}
