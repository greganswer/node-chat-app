var socket = io();
var messageInput = $('[name=message]');
var locationButton = $('#send-location');

function addNewMessageToPage(html) {
  var messages = jQuery('#messages');
  messages.append(html);
  var newMessage = messages.children('li:last-child');

  // Heights
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();
  var isNearBottomOfScreen =
    clientHeight + scrollTop + newMessageHeight + lastMessageHeight >=
    scrollHeight;

  if (isNearBottomOfScreen) {
    messages.scrollTop(scrollHeight);
  }
}

socket.on('connect', function() {
  console.log('Connected to server');
});

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = $('#message-template').html();
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime,
  });
  addNewMessageToPage(html);
});

socket.on('newLocationMessage', function(message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#location-message-template').html();
  var html = Mustache.render(template, {
    from: message.from,
    url: message.url,
    createdAt: formattedTime,
  });
  addNewMessageToPage(html);
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
