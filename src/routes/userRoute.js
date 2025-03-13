import express from 'express';
import {validateUser} from "../validator/userValidator.js";
import UserControllers from "../controllers/userControllers.js";


const router = express.Router()

    .get('/users/search', UserControllers.getUsers)
    .get('/users', UserControllers.getAllUsers)
    .post('/users', validateUser, UserControllers.createUser)
    .put('/users/:id', validateUser, UserControllers.updateUser)

    .get('/users/:id', UserControllers.getUserById)
export default router;
