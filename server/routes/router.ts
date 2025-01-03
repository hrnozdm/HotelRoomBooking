import { Router } from "express";
import { login, register } from "../controller/AuthController";
import { authenticateJWT } from "../middleware/Auth.middleware";
import { createRoom, deleteRoom, updateRoom } from "../controller/RoomController";
import { getRooms } from "../controller/RoomController";
import { bookingHistory, bookingRoom, cancelBookingRoom } from "../controller/BookingController";


const router:Router = Router();

router.get("/", (req, res) => {
    res.send("Hello OtelRoomBookingApi");
});

router.post('/register',register);
router.post('/login',login);
router.post('/create-room',authenticateJWT,createRoom);
router.get('/rooms',getRooms);
router.post('/book-room',authenticateJWT,bookingRoom);
router.post('/cancel-booking',authenticateJWT,cancelBookingRoom);
router.get('/booking-history',authenticateJWT,bookingHistory);
router.put('/update-room/:id',authenticateJWT,updateRoom);
router.delete('/delete-room/:id',authenticateJWT,deleteRoom);


export default router;