import { Request,Response,NextFunction } from "express";
import jwt from 'jsonwebtoken';

interface AuthRequets extends Request{
    user?:any;
}

export const authenticateJWT = (req: AuthRequets, res: Response, next: NextFunction):void => {
    const jwtKey=process.env.JWT_SECRET as string;
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
         res.status(401).json({ error: 'Access denied' });
         return;
    }

    try {
        const decoded = jwt.verify(token, jwtKey);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ error: 'Invalid token' });
    }
};
