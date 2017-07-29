require('./config/config');

/**
 * Modules
 */
const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const { generateMessage, generateLocationMessage } = require('./utils/message');
const { isRealString } = require('./utils/validation');
const { Users } = require('./utils/users');

/**
 * Local variables
 */
const publicPath = path.join(__dirname, '../public');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const users = new Users();
app.use(express.static(publicPath));

io.on('connection', socket => {
  /**
   * New user Join
   */
  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room name are required.');
    }
    socket.join(params.room);

    // Remove user from other rooms
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));

    socket.emit(
      'newMessage',
      generateMessage('Admin', 'Welcome to the chat app'),
    );

    socket.broadcast
      .to(params.room)
      .emit(
        'newMessage',
        generateMessage('Admin', `${params.name} has joined`),
      );

    callback();
  });

  /**
   * Message created
   */
  socket.on('createMessage', (message, callback) => {
    let user = users.getUser(socket.id);

    if (user && isRealString(message.text)) {
      io
        .to(user.room)
        .emit('newMessage', generateMessage(user.name, message.text));
    }

    callback();
  });

  socket.on('createLocationMessage', coords => {
    let user = users.getUser(socket.id);

    if (user) {
      io
        .to(user.room)
        .emit(
          'newLocationMessage',
          generateLocationMessage(user.name, coords.latitude, coords.longitude),
        );
    }
  });

  /**
   * User Disconnected
   */
  socket.on('disconnect', () => {
    let user = users.removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io
        .to(user.room)
        .emit('newMessage', generateMessage('Admin', `${user.name} has left`));
    }
  });
});

/**
 * Final setup
 */
const PORT = process.env.PORT;
const ENV = process.env.NODE_ENV;
let message = `Server is running on port ${PORT} in ${ENV}`;
app.get('*', (req, res) => res.send('404 - Not found'));
server.listen(PORT, () => console.log(message));
module.exports = { app };
