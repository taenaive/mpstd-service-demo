'use strict';

var _ = require('lodash');
var SoapFactory = require('./soap_factory.model');
var soapUtil = require("./soap_util.js");

// Get list of soap_factorys
exports.index = function(req, res) {
  SoapFactory.find(function (err, soap_factorys) {
    if(err) { return handleError(res, err); }
    return res.json(200, soap_factorys);
  });
};

// Get a single soap_factory
exports.show = function(req, res) {

  if (req.params.id =="applicant" && req.query.id){
        //req.query.id  is applicant id that gets passed from query string.
        //sqlQuery = qs.getApplicantInfoSqlString( req.query.id );
         // oracleUtil.executeApplicant(sqlQuery, res, function(err, result){
         //              if(err) {return res.json({})}
         //                 return res.json(result );
         //             });
         soapUtil.executeApplicant({applicantId: req.query.id } ,res);
         return;
      }
    return handleError(res, err);
  // SoapFactory.findById(req.params.id, function (err, soap_factory) {
  //   if(err) { return handleError(res, err); }
  //   if(!soap_factory) { return res.send(404); }
  //   return res.json(soap_factory);
  // });
};

// Creates a new soap_factory in the DB.
exports.create = function(req, res) {
 console.log('tae: hola post msg!');
  if (req.params.id =="retrieveAckRequest" 
                      && req.body 
                      && typeof req.body.msg != 'undefined' ){
         //console.log(req.body.msg);
         soapUtil.retrieveAckRequestRest(req.body.msg ,res);
         return;
      }
  else if (req.params.id =="medicalPreScreen"&& req.body 
                      && typeof req.body.msg != 'undefined' ){
         soapUtil.genericRest('med',req.body.msg ,res);
         return;
      }
      //medicalPreScreenCreate
  else if (req.params.id =="medicalPreScreenCreate"&& req.body 
                      && typeof req.body.msg != 'undefined' ){
         soapUtil.genericRest('medCreate',req.body.msg ,res);
         return;
      }
      //bpiRetrive
  else if (req.params.id =="bpiRetrive"&& req.body 
                      && typeof req.body.msg != 'undefined' ){
         soapUtil.genericRest('bpiRetrive',req.body.msg ,res);
         return;
      }
      //bpiSync
  else if (req.params.id =="bpiSync"&& req.body 
                      && typeof req.body.msg != 'undefined' ){
         soapUtil.genericRest('bpiSync',req.body.msg ,res);
         return;
      }
      //bpiRetrive
  else if (req.params.id =="docRetrieve"&& req.body 
                      && typeof req.body.msg != 'undefined' ){
         soapUtil.genericRest('docRetrieve',req.body.msg ,res);
         return;
      }
      //bpiSync
  else if (req.params.id =="docUpload"&& req.body 
                      && typeof req.body.msg != 'undefined' ){
         soapUtil.genericRest('docUpload',req.body.msg ,res);
         return;
      }
       //bpiSync
  else if (req.params.id =="medicalExam"&& req.body 
                      && typeof req.body.msg != 'undefined' ){
         soapUtil.genericRest('medicalExam',req.body.msg ,res);
         return;
      }
  else {
      return handleError(res, err);
    }
  // SoapFactory.create(req.body, function(err, soap_factory) {
  //   if(err) { return handleError(res, err); }
  //   return res.json(201, soap_factory);
  // });
};

// Updates an existing soap_factory in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  SoapFactory.findById(req.params.id, function (err, soap_factory) {
    if (err) { return handleError(res, err); }
    if(!soap_factory) { return res.send(404); }
    var updated = _.merge(soap_factory, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, soap_factory);
    });
  });
};

// Deletes a soap_factory from the DB.
exports.destroy = function(req, res) {
  SoapFactory.findById(req.params.id, function (err, soap_factory) {
    if(err) { return handleError(res, err); }
    if(!soap_factory) { return res.send(404); }
    soap_factory.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}