'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SoapFactorySchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('SoapFactory', SoapFactorySchema);