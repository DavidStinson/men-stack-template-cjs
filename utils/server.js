// ! utilities to help run the server

// normalize a port into a number, string, or false
function normalizePort(val) {
  const port = parseInt(val, 10)

  // named pipe
  if (isNaN(port)) return val
  
  // port number
  if (port >= 0) return port

  return false
}

// event listener for HTTP server error event
function onError(error, port) {
  if (error.syscall !== 'listen') throw error
  
  const bind = typeof port === 'string'? `Pipe ${port}`: `Port ${port}`

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`)
      process.exit(1)
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`)
      process.exit(1)
    default:
      throw error
  }
}

// event listener for HTTP server listening event
function onListening(port) {
  const bind = typeof port === 'string' ? `pipe ${addr}` : `port ${port}`
  console.log(`Hear that? That's the sound of a server running on ${bind}!`)
}

module.exports = {
  normalizePort,
  onError,
  onListening,
}
