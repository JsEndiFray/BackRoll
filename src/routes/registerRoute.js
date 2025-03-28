import express from "express";
import {ValidatorRegister} from "../validator/registerValidator.js";
import registerController from "../controllers/registerControllers.js";
import {verifyTokenMiddleware} from "../middlewares/verifyToken.js";


const router = express.Router()

    .get('/register', registerController.getAllUsers)
    .get('/register/search',registerController.getUser)
    .get('/register/:id', registerController.getUserById )
    .post('/register', verifyTokenMiddleware, ...ValidatorRegister, registerController.createUser)
    .post('/register/login', registerController.login)
    .put('/register/:id', verifyTokenMiddleware,  ...ValidatorRegister, registerController.updateUser)
    .delete('/register/:id', verifyTokenMiddleware,  registerController.deleteUser)

export default router;