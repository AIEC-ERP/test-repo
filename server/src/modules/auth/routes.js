import express from "express";
import {loginAuthenticate,refreshAuthToken} from "./controller.js";
const router = express.Router();

router.post("/auth/login", loginAuthenticate);
// sample payload
// {
//     username: "",
//     password:""
// }
router.get("/auth/refresh",refreshAuthToken);


export default router;