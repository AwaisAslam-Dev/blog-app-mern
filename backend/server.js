import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import dbconnect from './config/dbconnect.js'
import Router from './router/userRouter.js'
import Routerblog from './router/blogRouter.js'
import commentRouter from './router/commentRouter.js'
const app = express()
app.use(cors())
app.use(express.json())
const port = 3000
dotenv.config();
dbconnect();
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use('/uploads', express.static('uploads'));

app.use("/auth/api",Router)
app.use("/blog/api",Routerblog)
app.use("/comment/api",commentRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
