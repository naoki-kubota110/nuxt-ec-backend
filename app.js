const express = require('express')
const userRouter = require('./routes/user')
const orderRouter = require('./routes/order')
const app = express()
require('./mongodb')
app.use(express.json()) //  この記述によりreqのbodyが読み込める
const cors = require('cors')
app.use(
  cors({
    origin: ["https://nuxt-express-ec.an.r.appspot.com","http://localhost:3000"], 
    credentials: true, 
    optionsSuccessStatus: 200, 
  },
  )
);

// Router
app.use('/user', userRouter)
app.use('/order', orderRouter)


const port = process.env.PORT || 5000
app.listen(port, () => console.log(`port number is ${port}`))