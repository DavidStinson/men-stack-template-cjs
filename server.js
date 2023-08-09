// require modules and utilities
const http = require('http')
const path = require('path')
const express = require('express')
const logger = require('morgan')
const utils = require('./utils/server.js')

// require routers
const indexRouter = require('./routes/index.js')

// create the express app
const app = express()

// view engine setup
app.set('view engine', 'ejs')

// basic middleware
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

// mount required routes
app.use('/', indexRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function (err, req, res, next) {
  // render the error page
  res.status(err.status || 500)
  res.render('error', {
    errMsg: err.message,
    // Only provide the full error object in development
    error: req.app.get('env') === 'development' ? err : {}
  })
})

// create node HTTP server
const server = http.createServer(app)

// get port from environment or use port 3000
const port = utils.normalizePort(process.env.PORT || '3000')

// listen on provided port on all network interfaces
server.listen(port)

// server event listeners
server.on('error', (err) => utils.onError(err, port))
server.on('listening', () => utils.onListening(port))
