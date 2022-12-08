const express = require('express')
const mongoose = require('mongoose')
const routes = require('./router/route')

const app = express()

mongoose.connect('mongodb+srv://admin:b2VXFpUw70apa1tH@cluster0.xwlqu.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true })

const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('connected', () => console.log('Connected to Database'))

app.use(express.json())

app.use('/', routes)
app.listen(3000, () => console.log('Server Started'))
