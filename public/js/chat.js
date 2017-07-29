/**
 * Variables
 */
var socket = io();
var $messages = jQuery('#messages');
var $users = jQuery('#users');
var $messageInput = $('[name=message]');
var $locationButton = $('#send-location');

/**
 * Add a new message to the chat page
 * @param {String} html The HTML markup of the message
 */
function addNewMessageToPage(html) {
  $messages.append(html);
  var newMessage = $messages.children('li:last-child');

  // Heights
  var clientHeight = $messages.prop('clientHeight');
  var scrollTop = $messages.prop('scrollTop');
  var scrollHeight = $messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();
  var isNearBottomOfScreen =
    clientHeight + scrollTop + newMessageHeight + lastMessageHeight >=
    scrollHeight;

  if (isNearBottomOfScreen) {
    $messages.scrollTop(scrollHeight);
  }
}

/**
 * When a user connects to /chat.html
 */
socket.on('connect', function() {
  var params = jQuery.deparam(window.location.search);

  socket.emit('join', params, function(err) {
    if (err) {
      alert(err);
      window.location.href = '/';
    } else {
      console.log('No error');
    }
  });
});

/**
 * When a user disconnects from /chat.html
 */
socket.on('disconnect', function() {
  console.log('Disconnected from server');
});

/**
 * When the user list is updated
 */
socket.on('updateUserList', function(users) {
  var ol = jQuery('<ol></ol>');

  users.forEach(function(user) {
    ol.append(jQuery('<li></li>').text(user));
  });
  $users.html(ol);
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
  socket.emit('createMessage', { text: $messageInput.val() }, function() {
    $messageInput.val('');
  });
});

$locationButton.on('click', function(e) {
  if (!navigator.geolocation) {
    return alert('Geoloaction not supported by your browswer');
  }

  $locationButton.attr('disabled', 'disabled').text('Sending location...');

  navigator.geolocation.getCurrentPosition(
    function(position) {
      $locationButton.removeAttr('disabled').text('Sending location');
      socket.emit('createLocationMessage', {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    },
    function() {
      $locationButton.removeAttr('disabled').text('Sending location');
      alert('Unable to fecth location');
    },
  );
});
