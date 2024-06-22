import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import response from "../response.js"

const env = dotenv.config().parsed

const jwtAuth = () => {
    return async (req, res, next) => {
        try {
            if(!req.headers.authorization) {throw{code:401,message:'UNAUTHORIZED'}}

            const token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token,env.JWT_SECRET)
            req.user = decoded
            next()
        } catch (error) {
            const errorJwt = ['invalid signature','jwt malformed', 'jwt must be provided', 'invalid token']
            if (error.message == 'jwt expired'){
                error.message = 'ACCESS_TOKEN_EXPIRED'
            }else if (errorJwt.includes(error.message)){
                error.message = 'INVALID_ACCESS_TOKEN'
            }

            return res.status(error.code||500).json(response.responseFailed(error.message))
        }
    }
}

export default jwtAuth