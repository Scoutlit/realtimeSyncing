/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  autoPK: true,
  autoCreatedAt: true,
  autoUpdatedAt: true,

  attributes: {
    name: { type: 'string' },
    email: { type: 'string' },
    contacts: { collection: 'contact', via: 'user' }
  },

  // Add change to change log
  beforeUpdate: function(newUser, cb) {
    // Add change to change log
    sails.log.info('updating', newUser);
    cb();
  }
};

