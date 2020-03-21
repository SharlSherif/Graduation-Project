const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const app = express()
//? make enviroment variables accessible
require('dotenv').config()
//* establish db connection
require('./database')
//? routes
const AuthRoute = require('./routes/auth.route')
const AdminRoute = require('./routes/Admin.route')
const UserRoute = require('./routes/User.route')
const PlaceRoute = require('./routes/Place.route')
const authenticate = require('./middlewares/check-auth')
app.use(morgan('dev'))

// body parser
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)
app.use(bodyParser.json())

// allowing CORS headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  )
  next()
})

app.use('/api/auth', AuthRoute)
app.use('/api/user', authenticate, UserRoute)
app.use('/api/admin', authenticate, AdminRoute)
app.use('/api/place', authenticate, PlaceRoute)

app.listen(4000, () => console.log('GP up on 4000..'))