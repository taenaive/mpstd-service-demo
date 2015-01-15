
/** applicant profile service from soa */
var soapGetApplicant = require('./soap_calls').soapGetApplicant('http://mpstd-soa01:8001/soa-infra/services/default/ApplicantProfileService/ApplicantProfileService_ep?WSDL');
//var retrieveAckRequest = require('./soap_calls').retrieveAckRequest('http://mpstd-soa01:8011/mpstd/soap/AcknowledgmentProxyService?WSDL');
var retrieveAckRequest = require('./soap_calls').retrieveAckRequest('http://MPSTD-SOA01:8001/soa-infra/services/default/AcknowledgmentService/AcknowledgementService_ep?WSDL');

var rest_calls = require('./rest_calls');
/** specialized soap call for getting all the applicant data */
exports.executeApplicant = function (inputData, res, callback){

	soapGetApplicant.retrieve(inputData, function (err, result ){
    if(err){
        console.log("<<soap_util.js>>soapGetApplicant Operation failed.");
        res.send({});
    }else{
       res.send(result);
    }
  });
}

exports.retrieveAckRequest = function (inputData, res, callback){

	retrieveAckRequest.retrieve(inputData, function (err, result ){
    if(err){
        console.log("<<soap_util.js>>retrieveAckRequest SOAP Operation failed.");
        console.log(JSON.stringify(err));
        res.send({});
    }else{
       res.send(result);
    }
  });
}

exports.retrieveAckRequestRest = function (inputData, res, callback){

  rest_calls.retrieveAckRequest_Rest(inputData, function (err, result ){
    if(err){
        console.log("<<soap_util.js>>retrieveAckRequest Rest Operation failed.");
        console.log(JSON.stringify(err));
        res.send({});
    }else{
       res.send(result);
    }
  });
}

exports.retrieveMedicalPreScreenRest = function (inputData, res, callback){

  rest_calls.MedicalPreScreen_Rest(inputData, 
      'http://MPSTD-SOA01:8011/mpstd/rest/MedicalPrescreenRetriveRest',
      function (err, result ){
    if(err){
        console.log("<<soap_util.js>>MedicalPreScreen_Rest Rest Operation failed.");
        console.log(JSON.stringify(err));
        res.send({result: err});
    }else{
       res.send(result);
    }
  });
}