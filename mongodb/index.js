const mongoose = require('mongoose')
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};
mongoose.connect("mongodb+srv://user1:rakus2098@cluster0.rpec9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",options)
mongoose.connection.once('open', () => {
  console.log('db connected')
})

module.exports = mongoose