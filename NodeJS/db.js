const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/CRUD', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false }, (err) => {
  if (!err) {
    console.log('ket noi db ok!')
  }
  else {
    console.log(JSON.stringify(err, undefined, 2))
  }
})

// cach 2 (lam trong mern stack)
// const connection = mongoose.connection;

// connection.once('open', () => {
//   console.log("MongoDB database connection established successfully");
// })

module.exports = mongoose;