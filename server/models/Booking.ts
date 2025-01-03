import { Schema, model, Types } from 'mongoose';

interface IBooking {
    userId: Types.ObjectId | string; 
    roomId: Types.ObjectId | string;
    date: Date;
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
    date: {
        type: Date,
        default: Date.now
    }
});

export default model<IBooking>('Booking', bookingSchema);
