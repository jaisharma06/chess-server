const express = require("express")
const cors = require('cors')
const app = express()
var bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Player = require('./Schemas/player')
const SocketHandler = require('./Socket/SocketHandler')

const dbURL = 'mongodb://localhost:27017/custom-chess'

app.use(cors())
app.use(bodyParser.urlencoded({extended: true})) 
app.use(bodyParser.json()) 

mongoose.set('strictQuery', false)
mongoose.connect(dbURL)
const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error: '))
db.once('open', () => {
  console.log('Connection Successful')
})

//APIS
app.get('/login', Player.getPlayer)

app.post('/register', Player.addPlayer)
//APIS END

//SOCKET
var socketHandler = new SocketHandler(app)
//SOCKET END