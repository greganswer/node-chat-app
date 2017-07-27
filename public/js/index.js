var socket = io();
var messageInput = $('[name=message]');
var locationButton = $('#send-location');

socket.on('connect', function() {
  console.log('Connected to server');
});

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  console.log('New message', message);
  var li = $('<li></li>');
  li.text(`${message.from} ${formattedTime}: ${message.text}`);
  $('#messages').append(li);
});

socket.on('newLocationMessage', function(message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var li = $('<li></li>');
  var a = $('<a target="_blank">My current location</a>');

  li.text(`${message.from} ${formattedTime}: `);
  a.attr('href', message.url);
  li.append(a);
  $('#messages').append(li);
});

$('#message-form').on('submit', function(e) {
  e.preventDefault();
  socket.emit(
    'createMessage',
    {
      from: 'User',
      text: messageInput.val(),
    },
    function() {
      messageInput.val('');
    },
  );
});

locationButton.on('click', function(e) {
  if (!navigator.geolocation) {
    return alert('Geoloaction not supported by your browswer');
  }

  locationButton.attr('disabled', 'disabled').text('Sending location...');

  navigator.geolocation.getCurrentPosition(
    function(position) {
      locationButton.removeAttr('disabled').text('Sending location');
      socket.emit('createLocationMessage', {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    },
    function() {
      locationButton.removeAttr('disabled').text('Sending location');
      alert('Unable to fecth location');
    },
  );
});
