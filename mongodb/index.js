// require('dotenv').config();
const mongoose = require('mongoose')
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};
// const connect_key = process.env.MONGODB_CONNECT_KEY
mongoose.connect("mongodb+srv://user1:rakus2098@cluster0.rpec9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",options)
mongoose.connection.once('open', () => {
  console.log('db connected')
})

module.exports = mongoose