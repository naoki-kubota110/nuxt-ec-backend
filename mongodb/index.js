require('dotenv').config();
const mongoose = require('mongoose')
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};
const connect_key = process.env.MONGODB_CONNECT_KEY
mongoose.connect(connect_key,options)
mongoose.connection.once('open', () => {
  console.log('db connected')
})

module.exports = mongoose