import jwt from 'jsonwebtoken' 
import jwtPassword from '../jwt/jwtPassword'

const secretKey = jwtPassword

export const jwtService = {

 generateToken: (payload: string | object | Buffer, expiration: string | number ) => {
   return jwt.sign(payload, secretKey, {
    expiresIn: typeof expiration === 'string' ? parseInt(expiration, 10) : expiration,
   });
 },
 
 verifyToken: (token: string, callbackfn: jwt.VerifyCallback) => {
  jwt.verify(token,secretKey,callbackfn)
 }

}

