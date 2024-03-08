import express from "express";
import { getUsers, register, sendVerificationCode, verifyEmail, Login, Logout} from "../controller/UserController.js"
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controller/RefreshToken.js";

const router = express.Router();
router.get("/users", verifyToken, getUsers);
router.get("/refresh-token", refreshToken);
router.post("/register", register);
router.post("/login", Login);
router.delete("/logout", Logout);
router.post("/send-verification-code", sendVerificationCode);
router.post("/verify-code", verifyEmail);

export default router;