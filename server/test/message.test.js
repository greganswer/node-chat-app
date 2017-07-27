// Modules
const expect = require('expect');

// Local
const { app } = require('./../server');
const {
  generateMessage,
  generateLocationMessage,
} = require('./../utils/message');

/**
 * Testing
 */
describe('generateMessage', () => {
  it('should generate correct message object', () => {
    let from = 'Joe';
    let text = 'Some message';
    let message = generateMessage(from, text);

    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({ from, text });
  });
});

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    let from = 'Joe';
    let latitude = 15;
    let longitude = 19;
    let url = 'https://www.google.com/maps?q=15,19';
    let message = generateLocationMessage(from, latitude, longitude);

    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({ from, url });
  });
});
