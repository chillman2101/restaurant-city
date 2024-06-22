import User from "../models/User.js"
import response  from "../response.js"
import userLibrary from "../libraries/user.js"
import bcrypt from "bcrypt"

class AuthController{   
   async register(req,res){
        try{
            if(!req.body.fullname) {throw{code: 400, message: 'Fullname is required'}}
            if(!req.body.email) {throw{code: 400, message: 'Email is required'}}
            if(!req.body.password) {throw{code: 400, message: 'Password is required'}}
            const isPasswordValid = userLibrary.checkPasswordLength(req.body.password)
            if(!isPasswordValid) {throw{code:400, message: 'Password less than 6'}}
            //check email exist
            const isEmailExist = await userLibrary.emailExist(req.body.email)            
            if(isEmailExist) {throw{code:409,message:"Email Already Exist"}}

            //hash password
            const salt = await bcrypt.genSalt(10)
            const hash = await bcrypt.hash(req.body.password, salt)
            
            

            const user = await User.create({
                fullname: req.body.fullname,
                email:req.body.email,
                password: hash,
                })
            return res.status(201).json(response.responseSuccess(user,1))
        }catch(error){
            return res.status(error.code).json(response.responseFailed(error.message))
        }
   }

   async login(req,res){
    try {
        if(!req.body.email) {throw{code: 400, message: 'Email is required'}}
        if(!req.body.password) {throw{code: 400, message: 'Password is required'}}
        
        const user = await User.findOne(req.body.email)
        if(!user) {throw{code:404,message:"User not found"}}
        const isPasswordValid = await userLibrary.comparePassword(user.password,req.body.email)

    } catch (error) {
        return res.status(error.code).json(response.responseFailed(error.message))
    }
   }

   async fetch(req,res){
        try{
            const users = await User.find()
            return res.status(200).json(response.responseSuccess(users,users.length))
        }catch(error){
            return res.status(500).json(response.responseFailed(error.message))
        }
   }
}

export default new AuthController()