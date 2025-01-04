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

const checkRoomAvailability = async (req: Request, res: Response) => {
  const { roomId, checkInDate, checkOutDate } = req.body;

  try {
    const existingBookings = await Booking.find({
      roomId,
      $or: [
        { checkInDate: { $lt: new Date(checkOutDate), $gte: new Date(checkInDate) } },
        { checkOutDate: { $gt: new Date(checkInDate), $lte: new Date(checkOutDate) } },
        { checkInDate: { $lte: new Date(checkInDate) }, checkOutDate: { $gte: new Date(checkOutDate) } }
      ]
    });

    if (existingBookings.length > 0) {
       res.json({ isAvailable: false });
       return;
    }

    res.json({ isAvailable: true });
  } catch (error) {
    res.status(500).json({ message: "Error checking availability" });
  }
};

const bookingRoom = async (req: BookRequest, res: Response) => {
  if (req.user?.role !== "customer") {
    res.status(403).json({ message: "Access denied" });
    return;
  }

  try {
    const { roomId,checkInDate,checkOutDate } = req.body;
    
    if (new Date(checkInDate) > new Date(checkOutDate)) {
      res.status(400).json({ message: "Check-out date must be greater than check-in date" });
      return;
    }

    const existingBookings = await Booking.find({
      roomId,
      $or: [
        { checkInDate: { $lt: new Date(checkOutDate), $gte: new Date(checkInDate) } },
        { checkOutDate: { $gt: new Date(checkInDate), $lte: new Date(checkOutDate) } },
        { checkInDate: { $lte: new Date(checkInDate) }, checkOutDate: { $gte: new Date(checkOutDate) } }
      ]
    });

    if (existingBookings.length > 0) {
         res.status(400).json({ error: 'Room is not available for the selected dates' });
         return;
    }

    const room = await Room.findOne({ _id: roomId });
    if (!room || !room.isAvailable) {
      res.status(400).json({ message: "Room not available" });
      return;
    }

    const newBooking = new Booking({
        userId: req.user?.id,
        roomId: room.id,
        checkInDate:checkInDate,
        checkOutDate:checkOutDate,
      });

    await newBooking.save();

    res.status(201).json({ message: "Room booked successfully", newBooking,  success: true,room });
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
      const { bookingId } = req.body; 
      const booking = await Booking.findById(bookingId);
  
      if (!booking || booking.userId.toString() !== req.user?.id.toString()) {
        res.status(404).json({ message: "Booking not found or not authorized" });
        return;
      }
  
      const room = await Room.findById(booking.roomId);
      if (!room) {
        res.status(404).json({ message: "Room not found" });
        return;
      }
  
      
      await Booking.findByIdAndDelete(bookingId);
      room.isAvailable = true;
      await room.save();
  
      res.status(200).json({ message: "Room booking cancelled successfully", room });
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

export { bookingRoom, cancelBookingRoom, bookingHistory,checkRoomAvailability };
