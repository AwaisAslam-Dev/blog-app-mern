import express from 'express'
import { upload } from '../config/upload.js';
import {verifyToken} from '../middleware/auth.js'
import { addblog,delblog,getallblog,updateblog } from '../controller/blogController.js';
const Routerblog = express.Router();
Routerblog.post('/addblog',verifyToken,upload.single("thumbnail"),addblog)
Routerblog.delete('/deleteblog/:id',verifyToken,delblog)
Routerblog.put('/updateblog/:id',verifyToken,upload.single("thumbnail"),updateblog)
Routerblog.get('/getallblog',getallblog)
export default Routerblog;