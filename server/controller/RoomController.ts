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


const updateRoom = async (req:RoomRequest, res:Response) => {
  if (req.user?.role !== 'admin') {
      res.status(403).json({message:"Access denied"});
      return;  
  }

  try {
    const {type,number}=req.body;
    const room=await Room.findByIdAndUpdate({_id:req.params.id},{type, number},{new:true});
    res.json({message:"Room updated successfully",room});
  } catch (error) {
    res.status(400).json({message:"Error updating room"});
  }

};

const deleteRoom = async (req:RoomRequest, res:Response) => {
  if (req.user?.role !== 'admin') {
      res.status(403).json({message:"Access denied"});
      return;  
  }

  try {
    const room=await Room.findByIdAndDelete({_id:req.params.id});
    if (!room) {
      res.status(400).json({message:"Room not found"});
      return;
    }
    res.json({message:"Room deleted successfully"});
  } catch (error) {
    res.status(400).json({message:"Error deleting room"});
  }

};


const getRoomTypes = async (req:RoomRequest,res:Response) => {
  const roomTypes = ['Basic', 'Premium', 'Suite'];
  res.status(200).json({ roomTypes });
}


export {getRooms,getRoom,createRoom,updateRoom,deleteRoom,getRoomTypes};