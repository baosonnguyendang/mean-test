const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/CRUD', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology:true }, (err) => {
  if (!err) {
    console.log('ket noi db ok!')
  }
  else {
    console.log(JSON.stringify(err, undefined, 2))
  }
})

module.exports = mongoose;