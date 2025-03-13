import express from "express";
import RegisterControllers from "../controllers/registerControllers.js"

const router = express.Router()

.get('/', RegisterControllers.getAllRegisters)
.post('/login',RegisterControllers.login)
.post('/register', RegisterControllers.createRegister)

export default router;