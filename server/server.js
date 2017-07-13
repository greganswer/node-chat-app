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
app.use(express.static(publicPath));

io.on('connection', socket => {
  console.log('New user connected');

  socket.emit('newMessage', {
    from: 'Admin',
    text: 'Welcome to the chat app',
    createdAt: new Date().getTime(),
  });

  socket.broadcast.emit('newMessage', {
    from: 'Admin',
    text: 'New user joined',
    createdAt: new Date().getTime(),
  });

  socket.on('createMessage', message => {
    console.log('Create message ', message);
    socket.broadcast.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime(),
    });
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
