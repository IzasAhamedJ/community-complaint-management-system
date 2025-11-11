import express from 'express';
import { registration,login,getUser,roleUpdate} from '../controller/UserController.js';
const userRoutes=express.Router();


userRoutes.post('/registration',registration);

userRoutes.post('/login',login);

userRoutes.get('/getUser',getUser);

userRoutes.put('/updateRole/:id',roleUpdate)

export default userRoutes;