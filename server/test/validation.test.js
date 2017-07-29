/**
 * Modules
 */
const expect = require('expect');

const { app } = require('./../server');
const { isRealString } = require('./../utils/validation');

/**
 * Testing
 */
describe('isRealString', () => {
  it('should reject non-string values', () => {
    let result = isRealString(98);
    expect(result).toBe(false);
  });

  it('should reject string with only spaces', () => {
    let result = isRealString('  ');
    expect(result).toBe(false);
  });

  it('should allow string with non-space characters', () => {
    let result = isRealString('D');
    expect(result).toBe(true);
  });
});
