import { Schema, model, Types } from 'mongoose';

interface IBooking {
    userId: Types.ObjectId | string; 
    roomId: Types.ObjectId | string;
    checkInDate: Date;
    checkOutDate: Date;
}

const bookingSchema = new Schema<IBooking>({
    userId: {
        type: Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    roomId: {
        type: Schema.Types.ObjectId,
        ref: 'Room',
        required: true
    },
    checkInDate: {
        type: Date,
        required: true
    },
    checkOutDate: {
        type: Date,
        required: true
    }
   
});

export default model<IBooking>('Booking', bookingSchema);
