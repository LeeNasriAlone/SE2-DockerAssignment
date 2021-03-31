//  repository.js
//
//  Exposes a single function - 'connect', which returns
//  a connected repository. Call 'disconnect' on this object when you're done.
'use strict';

var mongoose = require('mongoose');
//  Class which holds an open connection to a repository
//  and exposes some simple functions for accessing data.
class Repository {
  constructor(connectionSettings) {
    this.connectionSettings = connectionSettings;
    mongoose.createConnection('mongodb://asset_mapping:27017/user', {useUnifiedTopology: true})
    .then(connection => {
      this.connection = connection;
      this.userProfileModel = this.connection.model('userProfile', new mongoose.Schema({
        user_id: String,
        uname: String,
        profile_image: String,
        last_update: Number,
      }), 'userProfile');
    })
    .catch(error => console.log(error));
  }


  getProfileImageByUsername(username) {
    return this.userProfileModel.find({ uname: username}).exec();
  }

  disconnect() {
    mongoose.disconnect();
  }
}

//  One and only exported function, returns a connected repo.
module.exports.connect = (connectionSettings) => {
  return new Promise((resolve, reject) => {
    if(!connectionSettings.host) throw new Error("A host must be specified.");
    if(!connectionSettings.user) throw new Error("A user must be specified.");
    if(!connectionSettings.password) throw new Error("A password must be specified.");
    if(!connectionSettings.port) throw new Error("A port must be specified.");

    resolve(new Repository(connectionSettings));
  });
};
