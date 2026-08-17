import express, { Router } from "express";

import { getData, login, logout, signup } from "../controllers/auth.controllers.js";
import tokenVerify from "../middleware/tokenVerify.js";
import { uploadMulter } from "../middleware/multer.js";

const authRouter = express.Router();

authRouter.post('/signup',uploadMulter.single("profileImg"),signup)
authRouter.post('/login',login)
authRouter.post('/logout',logout)

authRouter.get('/getdata',tokenVerify,getData)




export default authRouter;