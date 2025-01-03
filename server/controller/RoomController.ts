import { Request,Response } from "express";
import Room from "../models/Room";


interface RoomRequest extends Request{
    user?:{
       role?:string;
    };
}

const getRooms= async (req:Request, res:Response) => {  
   try {
     const rooms = await Room.find();
     res.json(rooms);
   } catch (error) {
     res.status(500).json({message:"Error getting rooms"});
   } 
}

const getRoom = async (req:Request, res:Response) => {
  try {
    const room = await Room.findById(req.params.id);
    res.json(room);
  } catch (error) {
    res.status(500).json({message:"Error getting room"});
  }
}


const createRoom = async (req:RoomRequest, res:Response) => {
   if (req.user?.role !== 'admin') {
       res.status(403).json({message:"Access denied"});
       return;  
   }

    try {
        const {type,number}=req.body;
        const room = new Room({type,number,isAvailable:true});
        await room.save();
        res.status(201).json({message:"Room created successfully",room});
    } catch (error) {
        res.status(400).json({message:"Error adding room"});
    }
}

export {getRooms,getRoom,createRoom};