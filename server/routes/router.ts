import { Router } from "express";
import { login, register } from "../controller/AuthController";
import { authenticateJWT } from "../middleware/Auth.middleware";
import { createRoom } from "../controller/RoomController";



const router:Router = Router();

router.get("/", (req, res) => {
    res.send("Hello OtelRoomBookingApi");
});

router.post('/register',register);
router.post('/login',login);
router.post('/create-room',authenticateJWT,createRoom);


export default router;