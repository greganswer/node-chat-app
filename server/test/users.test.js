/**
 * Modules
 */
const expect = require('expect');
const { Users } = require('./../utils/users');

/**
 * Testing
 */
describe('Users', () => {
  let users;

  beforeEach(() => {
    users = new Users();
    users.users = [
      { id: '1', name: 'Joe', room: 'Node Course' },
      { id: '2', name: 'Jen', room: 'React Course' },
      { id: '3', name: 'Bob', room: 'Node Course' },
    ];
  });

  it('should add new user', () => {
    let users = new Users();
    let user = { id: '123', name: 'Greg', room: 'Room 1' };
    let result = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]);
    expect(result).toEqual(user);
  });

  it('should remove a user', () => {
    let user = users.removeUser('2');
    expect(user.id).toEqual('2');
    expect(users.users.length).toBe(2);
  });

  it('should NOT remove a user', () => {
    let user = users.removeUser('4');
    expect(user).toNotExist();
    expect(users.users.length).toBe(3);
  });

  it('should find user', () => {
    let user = users.getUser('2');
    expect(user.id).toEqual('2');
  });

  it('should NOT find user', () => {
    let user = users.getUser('4');
    expect(user).toNotExist();
  });

  it('should return names for Node Course', () => {
    let result = users.getUserList('Node Course');
    expect(result).toEqual(['Joe', 'Bob']);
  });

  it('should return names for React Course', () => {
    let result = users.getUserList('React Course');
    expect(result).toEqual(['Jen']);
  });
});
