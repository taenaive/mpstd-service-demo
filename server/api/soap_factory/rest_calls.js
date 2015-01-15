// We need this to build our post string
var http = require('http');

exports.retrieveAckRequest_Rest = function PostCode(body, callback) {
  // Build the post string from an object
  if (body == null) {
    callback(null, {result: null});
    return;

  }
  // body = '<ret:retrieveAcknowledgementsRequest xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ret="http://www.mepcom.mil/mpstd/message/RetrieveAcknowledgements" xmlns:req="http://www.mepcom.army.mil/mpstd/dataTypes/common/RequestHeader">'+
  //        '<ret:requestHeader>'+
  //           '<req:loginUserName></req:loginUserName>'+
  //           '<req:requestId></req:requestId>'+
  //        '</ret:requestHeader>'+
  //        '<ret:cityOfBirth>Baltimore</ret:cityOfBirth>'+
  //        '<ret:dateOfBirth>1992-05-04T00:00:00.000-04:00</ret:dateOfBirth>'+
  //        '<ret:ssn>370212972</ret:ssn>'+
  //        '<ret:gender>Female</ret:gender>'+
  //     '</ret:retrieveAcknowledgementsRequest>';  

  
  // An object of options to indicate where to post to
  var post_options = {

      host: 'mpstd-soa01',
      port: '8011',
      path: '/mpstd/rest/AcknowledgementRestService',
      method: 'POST',
      headers: {
      	'Cookie': "cookie",
          'Content-Type': 'text/xml',
          'Content-Length': Buffer.byteLength(body)
      }
  };

  // Set up the request
  var post_req = http.request(post_options, function(res) {
      console.log( res.statusCode );
   var buffer = "";

   res.on('data', function (chunk) {
      		buffer = buffer +chunk;
          //console.log('Response: ' +  buffer);
      });

   res.on( "end", function( data ) { 
                    callback(null, {result: buffer});
                    //console.log( buffer ); 
                  } );
   
  });

  // post the data
  post_req.write(body);
  post_req.end();

}

//http://MPSTD-SOA01:8011/mpstd/rest/MedicalPrescreenRetriveRest
//http://MPSTD-SOA01:8011/mpstd/rest/MedicalPrescrnCreateRest
exports.MedicalPreScreen_Rest = function PostCode(body, urlcomp_path, callback ) {
  // Build the post string from an object
  if (body == null) {
    callback(null, {result: null});
    return;

  }
   
  // An object of options to indicate where to post to
  var post_options = {

      host: 'mpstd-soa01',
      port: '8011',
      path: urlcomp_path,
      method: 'POST',
      headers: {
        'Cookie': "cookie",
          'Content-Type': 'text/xml',
          'Content-Length': Buffer.byteLength(body)
      }
  };

  // Set up the request
  var post_req = http.request(post_options, function(res) {
      console.log( res.statusCode );
   var buffer = "";

   res.on('data', function (chunk) {
          buffer = buffer +chunk;
          //console.log('Response: ' +  buffer);
      });

   res.on( "end", function( data ) { 
                    callback(null, {result: buffer});
                    //console.log( buffer ); 
                  } );
   
  });

  // post the data
  post_req.write(body);
  post_req.end();

}