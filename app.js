// const express = require('express')
// const app = express();

// // Json形式のデータを利用
// app.use(express.json())

// // MongoDB接続
// require('./mongodb');

// const cors = require('cors')
// app.use(
//   cors({
//     origin: "http://localhost:3000", 
//     credentials: true, 
//     optionsSuccessStatus: 200, 
//   })
// );
// // Router
// const userRouter = require("./routes/user")
// app.use("/user",userRouter)
// // Router

const express = require('express')
const userRouter = require('./routes/user')
const orderRouter = require('./routes/order')
const app = express()
require('./mongodb')
app.use(express.json()) //  この記述によりreqのbodyが読み込める
const cors = require('cors')
app.use(
  cors({
    origin: "http://localhost:3000", 
    credentials: true, 
    optionsSuccessStatus: 200, 
  })
);

// Router
app.use('/user', userRouter)
app.use('/order', orderRouter)


const port = 5000;
app.listen(port, () => console.log(`port number is ${port}`))