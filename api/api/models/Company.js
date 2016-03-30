/**
 * Company.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

  },


  // Add change to change log
  beforeUpdate: function(newCompany, cb) {
    // Add change to change log
    sails.log.info('updating', newCompany);
    cb();
  }
};

