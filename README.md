Node Chat App
==================

> Node.js and Socket.io Chat app based on the tutorial for [The Complete Node.js Developer Course](https://www.udemy.com/the-complete-nodejs-developer-course-2) on Udemy. Currently viewable at this [Heroku link](https://immense-sierra-44077.herokuapp.com/).

![Main screenshot](public/images/samples/chat_sample_1.png)

## Table of contents

- [Getting started](#getting-started)
    - [Live site](#live-site)
    - [System requirements](#system-requirements)
    - [Installation](#installation)
    - [Running tests](#running-tests)
    - [Additional resources](#additional-resources)
- [The Project](#the-project)
    - [Proposal](#proposal)
    - [Target audiences](#target-audiences)
    - [Goals](#goals)
    - [Requirements](#requirements)
    - [Design considerations](#design-considerations)
    - [Todo](#todo)
- [Contributions](#contributions)
    - [Style guides](#style-guides)

## Getting started

### Live site

1. Click [this Heroku link](https://immense-sierra-44077.herokuapp.com/)
1. Create a user name and room
1. In another browser or on another device, create another user name and join the same room
1. Have fun chatting with yourself!

### System requirements

- [Node 8.1.4 +](https://nodejs.org/en/)
- Unix like operating system (OS X, Ubuntu, Debian, etc.)
- Not yet tested on Windows

### Installation

1. Clone or download the repository
1. `cp server/config/config.json.example server/config/config.json` and create your own keys for the following: `JWT_SECRET`
1. Make sure Mongo DB is installed. [Installation tutorial](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x)
1. In a separate terminal window, make sure Mongo DB process is running using `~/mongo/bin/mongod --dbpath ~/mongo-data` *(or wherever you have it installed)*
1. To view in browser at *http://localhost:3000*, in a separate terminal window, enter `npm run dev`

### Running tests

```shell
npm run test-watch
```

### Additional resources

- https://nodejs.org/en/docs/
- https://expressjs.com/
- https://socket.io/docs/

## The Project

### Proposal

I propose to complete this assignment as part of my quest to learn more about Node.js.

### Target audiences

- Hiring managers who want to see what I can do
- Developers who want to see some Node.js sample code

### Goals

- To gain knowledge of NodeJS and ExpressJS
- To develop a solid RESTful API backed by tests

### Requirements

- A computer with an internet connection
- I willingness to be challenged in order to learn and grow

### Design considerations

- I followed the styles and best practices laid out in the course
- As I learn more about Node.js and JavaScript in general, I return to this project for refactoring

### Todo

- Refactor code based on [Airbnb JavaScript style guide](https://github.com/airbnb/javascript)
- Refactor code based on [Clean Code: A Handbook of Agile Software Craftsmanship](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882)
- Make room names case insensitive
- Make user names unique
- Add a list of currently active chat rooms
- Some styling like [this one](https://socket-io-chat-webapp.herokuapp.com/) and here's [the repository](https://github.com/Babazon/nodejs_socketio_chatwebapp)
- Add [encryption](https://www.udemy.com/the-complete-nodejs-developer-course-2/learn/v4/questions/2119462)
- [Prevent join/leave spam](https://www.udemy.com/the-complete-nodejs-developer-course-2/learn/v4/questions/2520318)
- Add current users count for the login page and the selection list
- [Add authentication](https://www.udemy.com/the-complete-nodejs-developer-course-2/learn/v4/questions/2534768) and [read this](https://auth0.com/blog/auth-with-socket-io/)
- If browser tab is not active, flash the tab and show unread message count as in [this example](https://www.google.ca/search?q=javascript+detect+if+tab+is+active&oq=js+detect+if+ta&aqs=chrome.1.69i57j0l5.12357j0j7&sourceid=chrome&ie=UTF-8)

## Contributions

I'm not accepting contributions at this time but you can email me if you have any suggestions. greganswer@gmail.com

### Style guides

- [Airbnb JavaScript style guide](https://github.com/airbnb/javascript)
