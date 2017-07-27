require('./config/config');

// Modules
const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

// Locals
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const publicPath = path.join(__dirname, '../public');
const { generateMessage } = require('./utils/message');
app.use(express.static(publicPath));

io.on('connection', socket => {
  console.log('New user connected');

  socket.emit(
    'newMessage',
    generateMessage('Admin', 'Welcome to the chat app'),
  );

  socket.broadcast.emit(
    'newMessage',
    generateMessage('Admin', 'New user joined'),
  );

  socket.on('createMessage', (message, callback) => {
    console.log('Create message ', message);
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback('This is from the server');
  });

  socket.on('disconnect', socket => {
    console.log('User disconnected');
  });
});

// Routes
// app.get();

// Final
const PORT = process.env.PORT;
const ENV = process.env.NODE_ENV;
let message = `Server is running on port ${PORT} in ${ENV}`;
app.get('*', (req, res) => res.send('404 - Not found'));
server.listen(PORT, () => console.log(message));
module.exports = { app };
