import express from 'express';
import {validateUser} from "../validator/userValidator.js";
import UserControllers from "../controllers/userControllers.js";


const router = express.Router()
    .get('/users', UserControllers.getAllUsers)
    .get('/users/search', UserControllers.getUsers)
    .get('/users/:id', UserControllers.getUserById)
    .post('/users', validateUser, UserControllers.createUser)
    .put('/users/:id', validateUser, UserControllers.updateUser)
    .delete('/users/:id', UserControllers.deleteUser)


export default router;
