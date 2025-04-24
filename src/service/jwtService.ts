import jwt from 'jsonwebtoken' 
import jwtPassword from '../jwt/jwtPassword'

const secretKey = jwtPassword

export const jwtService = {

 generateToken: (payload: string | object | Buffer, expiration: string ) => {
   return jwt.sign(payload, secretKey, {
    expiresIn: expiration,
   });
 },
 
 verifyToken: (token: string, callbackfn: jwt.VerifyCallback) => {
  jwt.verify(token,secretKey,callbackfn)
 }

}

