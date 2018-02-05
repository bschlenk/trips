#!/usr/bin/env node

import app from './app';
import * as _debug from 'debug';
import * as http from 'http';

if (process.env.NODE_ENV !== 'production') {
  require('longjohn');
}

const debug = _debug('demo:server');

type Port = string | number;

/** Get port from environment and store in Express. */
const port: Port = normalizePort(process.env.PORT || '3001');

/** Create HTTP server. */
const server = http.createServer(app.callback());

// Listen on provided port, on all network interfaces.
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 * @param val The raw value to parse into a port.
 */
function normalizePort(val: string): Port {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  throw new Error(`could not parse ${val}`);
}

interface ServerError extends Error {
  syscall?: string,
  code?: string,
}

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error: ServerError) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? `pipe ${addr}`
    : `port ${addr.port}`;
  console.log(`listening on ${bind}`);
}
