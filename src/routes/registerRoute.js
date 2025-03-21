import express from "express";
import {ValidatorRegister} from "../validator/registerValidator.js";
import registerController from "../controllers/registerControllers.js";


const router = express.Router()

.get('/register', registerController.getAllRegisters)
.get('/register/search',registerController.getUser)
.get('/register/:id', registerController.getUserById )

export default router;