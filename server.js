// require npm packages
const express = require('express')
const logger = require('morgan')
const path = require('path')

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
    // Only provide the full erorr object in development.
    error: req.app.get('env') === 'development' ? err : {}
  })
})

module.exports = app
