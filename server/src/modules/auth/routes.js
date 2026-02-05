import express from "express";
import {loginAuthenticate,refreshAuthToken,userLogout} from "./controller.js";
import { validateRequest } from "../../middlewares/requestValidation.js";
import { loginSchema } from "./validator.js";
const router = express.Router();

router.post("/auth/login",validateRequest(loginSchema), loginAuthenticate);
// sample payload
// {
//     username: "",
//     password:""
// }
router.get("/auth/refresh",refreshAuthToken);

router.post("/auth/logout",userLogout);


export default router;