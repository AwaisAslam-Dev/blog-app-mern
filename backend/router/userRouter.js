import express from 'express';
const Router = express.Router();
import { register,login,forgetpassword,resetPassword } from '../controller/useController.js';
Router.post('/register',register);
Router.post('/login',login);
Router.post('/resetpassword',resetPassword)
Router.post('/forgetpassword',forgetpassword)
export default Router;