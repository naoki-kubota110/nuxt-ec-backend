const mongoose = require('mongoose')
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};
const MONGODB_CONNECT_KEY = ENV['MONGODB_CONNECT_KEY']
mongoose.connect(MONGODB_CONNECT_KEY,options)
mongoose.connection.once('open', () => {
  console.log('db connected')
})

module.exports = mongoose