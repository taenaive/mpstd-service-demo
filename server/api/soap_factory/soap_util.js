
/** applicant profile service from soa */
var soapGetApplicant = require('./soap_calls')('http://mpstd-soa01:8001/soa-infra/services/default/ApplicantProfileService/ApplicantProfileService_ep?WSDL');


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