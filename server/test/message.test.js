// Modules
const expect = require('expect');
// const request = require('supertest');

// Local
const { app } = require('./../server');
const { generateMessage } = require('./../utils/message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    let from = 'Joe';
    let text = 'Some message';
    let message = generateMessage(from, text);

    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({ from, text });
  });
});
