import { Request,Response } from "express";
import User from "../models/User";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const register = async (req:Request, res:Response) => {
    try {
        const {username,password,role} = req.body;
        const user = new User({username,password,role});
        await user.save();
        res.status(201).json({message:"User registered successfully"});
    } catch (error) {
        res.status(400).json({message:"Error registering user"});
    }
}

const login = async (req:Request, res:Response) => {

    const jwtSecret=process.env.JWT_SECRET as string;
    try {
        const {username,password} = req.body;
        const user = await User.findOne({username});
        if (!user) {
            res.status(400).json({ error: 'Invalid credentials' });
            return; 
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch){
            res.status(400).json({ error: 'Invalid credentials' });
            return;             
        }

        const token = jwt.sign({id:user._id,role:user.role},jwtSecret,{expiresIn:'1h'});
        res.json({token,user});
    } catch (error) {
        res.status(500).json({message:"Error logging in user"});
    }
}


export  {register,login};