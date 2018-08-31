let mongoose = require("mongoose")
const connectionStr = `mongodb://student:student1@ds233452.mlab.com:33452/vuesic`
let connection = mongoose.connection

mongoose.connect(connectionStr, {
  useNewUrlParser: true
})

connection.on('error', err => {
  console.log("DB ERROR:", err)
})

connection.once('open', () => {
  console.log("connected to db")
})