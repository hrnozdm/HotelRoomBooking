import { Request, Response } from "express";
import Room from "../models/Room";
import Booking from "../models/Booking";
import { Types } from "mongoose";

interface BookRequest extends Request {
  user?: {
    role?: string;
    id: string | Types.ObjectId;
  };
}

const bookingRoom = async (req: BookRequest, res: Response) => {
  if (req.user?.role !== "customer") {
    res.status(403).json({ message: "Access denied" });
    return;
  }
  try {
    const { roomId } = req.body;
    const room = await Room.findOne({ _id: roomId });
    if (!room || !room.isAvailable) {
      res.status(400).json({ message: "Room not available" });
      return;
    }
    room.isAvailable = false;
    await room.save();

    const newBooking = new Booking({
      userId: req.user?.id,
      roomId: room.id,
      date: new Date(),
    });
    
    if (!newBooking.userId) {
         res.status(400).json({ message: "User ID is required" });
         return;
      }

    await newBooking.save();

    res.status(200).json({ message: "Room booked successfully", room });
  } catch (error) {
    res.status(500).json({ message: "Error booking room" });
  }
};

const cancelBookingRoom = async (req: BookRequest, res: Response) => {
  if (req.user?.role !== "customer") {
    res.status(403).json({ message: "Access denied" });
    return;
  }
  try {
    const { roomId } = req.body;
    const room = await Room.findOne({ _id: roomId });
    if (!room || room.isAvailable) {
      res.status(400).json({ message: "Room not booked" });
      return;
    }
    room.isAvailable = true;
    await room.save();
    res
      .status(200)
      .json({ message: "Room booking cancelled successfully", room });
  } catch (error) {
    res.status(500).json({ message: "Error cancelling room booking" });
  }
};

const bookingHistory = async (req: BookRequest, res: Response) => {
  if (req.user?.role !== "customer") {
    res.status(403).json({ message: "Access denied" });
    return;
  }

  try {
    const bookings = await Booking.find({ userId: req.user.id }).populate(
      "roomId"
    );
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error getting booking history" });
  }
};

export { bookingRoom, cancelBookingRoom, bookingHistory };
