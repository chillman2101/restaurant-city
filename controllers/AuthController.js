import User from "../models/User.js"
import response from "../response.js"
import userLibrary from "../libraries/user.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from 'dotenv'

const env = dotenv.config().parsed

const genereateAccessToken = async (payload) => {
    return jwt.sign(payload, env.JWT_SECRET, { expiresIn: '15m' })
}
const genereateRefreshToken = async (payload) => {
    return jwt.sign(payload, env.REFRESH_SECRET, { expiresIn: '24h' })
}
class AuthController {
    async register(req, res) {
        try {
            if (!req.body.fullname) { throw { code: 400, message: 'FULLNAME_REQUIRED' } }
            if (!req.body.email) { throw { code: 400, message: 'EMAIL_REQUIRED' } }
            if (!req.body.password) { throw { code: 400, message: 'PASSWORD_REQUIRED' } }
            const isPasswordValid = userLibrary.checkPasswordLength(req.body.password)
            if (!isPasswordValid) { throw { code: 400, message: 'PASSWORD_LESS_THAN_6' } }
            //check email exist
            const isEmailExist = await userLibrary.emailExist(req.body.email)
            if (isEmailExist) { throw { code: 409, message: "EMAIL_ALREADY_EXIST" } }

            //hash password
            const salt = await bcrypt.genSalt(10)
            const hash = await bcrypt.hash(req.body.password, salt)



            const user = await User.create({
                fullname: req.body.fullname,
                email: req.body.email,
                password: hash,
            })
            const data = {
                fullname: user.fullname,
                email: user.email,
                status: user.status,
            }
            return res.status(201).json(response.responseSuccess(data, 'REGISTER_SUCCESS', 1))
        } catch (error) {
            return res.status(error.code).json(response.responseFailed(error.message))
        }
    }

    async login(req, res) {
        try {
            if (!req.body.email) { throw { code: 400, message: 'EMAIL_REQUIRED' } }
            if (!req.body.password) { throw { code: 400, message: 'PASSWORD_REQUIRED' } }

            //check user is exist
            const user = await User.findOne({ email: req.body.email })
            if (!user) { throw { code: 404, message: "USER_NOT_FOUND" } }

            //check password is valid
            const isPasswordValid = await userLibrary.comparePassword(req.body.password, user.password)
            if (!isPasswordValid) { throw { code: 400, message: 'INVALID_PASSWORD' } }

            const accessToken = await genereateAccessToken({ id: user._id })
            const refreshToken = await genereateRefreshToken({ id: user._id })

            const data = {
                fullname: user.fullname,
                email: user.email,
                status: user.status,
                token: accessToken,
                refreshToken
            }
            return res.status(200).json(response.responseSuccess(data, 'LOGIN_SUCCESS', 1))
        } catch (error) {
            return res.status(error.code || 500).json(response.responseFailed(error.message))
        }
    }

    async refreshToken(req, res) {
        try {
            if (!req.body.refreshToken) { throw { code: 400, message: 'REFRESH_TOKEN_REQUIRED' } }

            //verify token
            const verify = await jwt.verify(req.body.refreshToken,env.REFRESH_SECRET)
            
            let payload = {id:verify.id}

            const accessToken = await genereateAccessToken(payload)
            const refreshToken = await genereateRefreshToken(payload)

            const data = {              
                token: accessToken,
                refreshToken
            }
            return res.status(200).json(response.responseSuccess(data, 'LOGIN_SUCCESS', 1))
        } catch (error) {
            const errorJwt = ['invalid signature','jwt malformed', 'jwt must be provided', 'invalid token']
            if (error.message == 'jwt expired'){
                error.message = 'REFRESH_TOKEN_EXPIRED'
            }else if (errorJwt.includes(error.message)){
                error.message = 'INVALID_REFRESH_TOKEN'
            }

            return res.status(error.code||500).json(response.responseFailed(error.message))
        }
    }
}

export default new AuthController()