import express from "express";
import {loginAuthenticate} from "./controller.js";
const router = express.Router();

router.post("/auth/login", loginAuthenticate);
// sample payload
// {
//     username: "",
//     password:""
// }

export default router;