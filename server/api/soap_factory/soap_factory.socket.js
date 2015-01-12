/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var SoapFactory = require('./soap_factory.model');

exports.register = function(socket) {
  SoapFactory.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  SoapFactory.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('soap_factory:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('soap_factory:remove', doc);
}