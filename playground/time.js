const moment = require('moment');

// Jan 1st 1970 00:00:00 am
// 0 is this exact time
// +/- 1000 is +/- 1 second

let createdAt = 1234;
let date = moment(createdAt);
// date.add(100, 'year').subtract(9, 'months');
console.log(date.format('MMM Do, YYYY h:mm a'));
