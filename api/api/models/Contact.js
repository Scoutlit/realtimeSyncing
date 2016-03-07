/**
 * Contact.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    name: { type: 'string' },
    phoneNumber: { type: 'string' },
    address: { type: 'string' },
    city: { type: 'string' },
    region: { type: 'string' },
    country: { type: 'string' },
    company: { model: 'company' },
    companyExtension: { type: 'string' },
    user: { model: 'user' }
  }
};

