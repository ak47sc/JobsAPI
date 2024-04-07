const mongoose = require('mongoose')

//method to connect to Mongodb using mongoose
const connectDB = (url) => {
  return mongoose.connect(url)
}

module.exports = connectDB
