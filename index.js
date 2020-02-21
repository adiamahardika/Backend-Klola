const { port } = require('./src/configs')
const express = require('express')
const app = express()
const logger = require('morgan')
const bodyParser = require('body-parser')
const mainNavigation = require('./src/routes')
const cors = require('cors')

const whitelist = ['google.com', 'localhost:5000/product']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.listen(port, () => console.log(`This Server is Running on port ${port}`))

app.use(cors(corsOptions))

app.use(logger('dev'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/', mainNavigation)
