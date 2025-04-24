import { Request, Response , NextFunction} from 'express'
import { UserInstance } from '../models/User';
import { jwtService } from '../service/jwtService';
import { userService } from '../service/userService';
import { JwtPayload } from 'jsonwebtoken';


export interface LoginUserParams{
    email: string;
    password: string;
}

export interface AuthenticatedRequest extends Request {
    user?: UserInstance | null
}

export function ensureAuth(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
){
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return res.status(401).json({ message: 'Authorization header is missing' })
  }

    const token = authorizationHeader.replace(/Bearer /, '');

    jwtService.verifyToken(token, async (err, decoded) => {
        if (err || typeof decoded === 'undefined') {

            return res.status(401).json({ message: 'Invalid token' })
            
        }

        const user = await userService.findByEmail((decoded as JwtPayload).email);

        req.user = user

        next()
    })

}