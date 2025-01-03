import express, { Application } from "express";
import { connectDb } from "./config/db";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/router";
dotenv.config();
const app:Application = express();
const PORT = process.env.PORT;
app.use(cors());
app.use(express.json());
connectDb();
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
app.use("/api", router);




