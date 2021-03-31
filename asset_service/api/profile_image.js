//  users.js
//
//  Defines the users api. Add to a server by calling:
//  require('./users')
'use strict';

const http = require('axios');

//  Only export - adds the API to the app with the given options.
module.exports = (app, options) => {

 

  app.get('/', (req, res, next) => {

    //  Get the username.
    var username = req.query.username;
    if (!username) {
      throw new Error("When searching for a user, the username must be specified, e.g: '/?username=alice'.");
    }

    //  Get the user from the repo.
    options.repository.getProfileImageByUsername(username).then((images) => {

      if(images.length == 0) { 
        res.status(404).send('User not found.');
      } else {
		res.status(200).json(images[0])
      }
    })
    .catch(next);
    })
};
