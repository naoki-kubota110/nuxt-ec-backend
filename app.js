const express = require('express')
const userRouter = require('./routes/user')
const orderRouter = require('./routes/order')
const app = express()
require('./mongodb')
app.use(express.json()) //  この記述によりreqのbodyが読み込める
require('dotenv').config();
const FRONT_URL = process.env.FRONT_URL
const cors = require('cors')
// 本番環境用
app.use(
  cors({
    origin: [FRONT_URL], 
    credentials: true, 
    optionsSuccessStatus: 200, 
  })
);
// 開発環境用
// app.use(
//   cors({
//     origin: ["http://localhost:3000"], 
//     credentials: true, 
//     optionsSuccessStatus: 200, 
//   })
// );

// Router
app.use('/user', userRouter)
app.use('/order', orderRouter)


const port = process.env.PORT || 5000
app.listen(port, () => console.log(`port number is ${port}`))