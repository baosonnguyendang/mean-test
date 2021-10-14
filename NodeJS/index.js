const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const { mongoose } = require('./db.js')
var employeeController = require('./controllers/employeeController.js')

var app = express()
app.use(bodyParser.json())
app.use(cors({origin: 'http://localhost:4200'}))
// app.use(cors({origin: 'http://localhost:65229'}))

app.listen(3000, () => console.log('Server start at port 3000'))

//console.log(mongoose)
app.use('/employees', employeeController)