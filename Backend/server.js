import express from "express";
import cors from "cors";

import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";


dotenv.config()

import dns from "dns";

dns.setServers(["1.1.1.1","8.8.8.8"]);


const app = express()



app.use(express.json());

app.use(cookieParser());

app.use(cors({
    origin:"https://online-auth-project.vercel.app",credentials:true
}))

app.use('/api',authRouter)




const port = process.env.PORT;

app.listen(port,()=>{
    console.log(`server is started at ${port}`);
    connectDB();
})