import express from 'express'
import { addcomment,delcomment ,getallcomments} from '../controller/commentController.js'
import {verifyToken} from '../middleware/auth.js'
const commentRouter = express.Router();
commentRouter.post('/addcomment',verifyToken,addcomment)
commentRouter.delete('/deletecomment/:id',verifyToken,delcomment)
commentRouter.get('/getcomments/:id',getallcomments)
export default commentRouter;