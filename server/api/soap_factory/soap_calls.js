var soap = require('soap');

/**helper to find out diff date from now */
function diffDate( date_in){
	if (date_in === null || date_in ===NaN || typeof name_in !== 'object'|| Object.keys(date_in).length == 0) return null;
	console.log( "<<diffDate>> date_in value : " + JSON.stringify(date_in) );
	var date1 = new Date();
	var date2 = date_in;
	var timeDiff = Math.abs(date2 - date1);
	var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
	return diffDays +" days"; 
}
function nameFieldUtil( name_in){
	if( typeof name_in !== 'string'){
		return "N/A";
	}
	return name_in;
	
}
exports.retrieveAckRequest = function(url){
	
	var failedResponseHeader ={ operationStatus: 'false'} ;
	var func = {
		
		retrieve: function(data ,callback){ 
			//TODO:
			if (data.applicantId == null){
				 	data.applicantId='1261' //default test applicant
				 }
			if (data.userRoleType == null){
				 	data.userRoleType='ApplicantID' //default HIV DAT
				 }
			var requestArgs = {requestHeader:{ loginUserName: 'null', requestId:'1'}, 
                                          cityOfBirth: "Baltimore",
         								  dateOfBirth: new Date(),
										  ssn:"70212972",
         								  gender:"Female"
                                    };

            soap.createClient(url, function(err, client) {

			  	  if(err){
			  	  	  console.log ("Error msg: " + err);
			  	  	   callback(err, failedResponseHeader);
			  	  	   return;
			  	  }
  	              else{
	  	  				console.log(" ======= Oracle SOA retrieveSignature Response: ======");
	  	  				
	  	  				console.log( JSON.stringify(client.describe()) );	
	  	  				//console.log (JSON.stringify(client.retrieveAcknowledgements));
				        client.retrieveAcknowledgements(requestArgs, function(err, result) {
				           if(err){
				           	callback({err: err}, null);
				           	return;
				           }
				           
				           console.log (Object.keys(result));
				       //    console.log(aProfile.profilePicture.substring(0,300));

				           //userRoleType is the factor for the search
				           var APPL ={};
				         
				           callback(null,APPL);
				        });

				      }                     	
				});

		}
		
	}
	//console.log(" soapSave instanciated"); 
 	return func;
};

exports.soapGetApplicant = function(url){
	
	var failedResponseHeader ={ operationStatus: 'false'} ;
	var func = {
		
		retrieve: function(data ,callback){ 
			//TODO:
			if (data.applicantId == null){
				 	data.applicantId='1261' //default test applicant
				 }
			if (data.userRoleType == null){
				 	data.userRoleType='ApplicantID' //default HIV DAT
				 }
			var requestArgs = {requestHeader:{ loginUserName: 'null', requestId:'1'}, 
                                        searchTypeID: data.applicantId,
                                        searchTypeName: data.userRoleType
                                    };

            soap.createClient(url, function(err, client) {

			  	  if(err){
			  	  	  console.log ("Error msg: " + err);
			  	  	   callback(err, failedResponseHeader);
			  	  	   return;
			  	  }
  	              else{
	  	  				console.log(" ======= Oracle SOA retrieveSignature Response: ======");
	  	  				//console.log (JSON.stringify(client));
				        client.retrieveApplicantProfile(requestArgs, function(err, result) {
				           if(err){
				           	callback({err: "retrieveApplicantProfile Failed"}, null);
				           	return;
				           }
				           var aProfile =result.applicantProfile[0];
				           console.log (Object.keys(result));
				       //    console.log(aProfile.profilePicture.substring(0,300));

				           //userRoleType is the factor for the search
				           var APPL ={};
				           	  APPL.DaysSinceSeparation = diffDate( aProfile.serviceEndDate );	
							  APPL.FIRSTNAME = aProfile.firstName;
							  APPL.MIDDLENAME = nameFieldUtil(aProfile.middleName);
							  APPL.LASTNAME = aProfile.lastName;
							  APPL.SUFFIX = nameFieldUtil(aProfile.suffixName);
							  APPL.DATEOFBIRTH = aProfile.birthDate;
							  APPL.BRANCH_OF_SERVICE = aProfile.branch;
							  APPL.PRIOR_BRANCH_OF_SERVICE = "N/A"; //aProfile.priorService;
							  APPL.PHOTO = aProfile.profilePicture;
							  APPL.SSN = '###-##-'+ aProfile.ssn.substring(aProfile.ssn.length -4, aProfile.ssn.length);
							  
							  //console.log(JSON.stringify(APPL));

				           callback(null,APPL);
				        });

				      }                     	
				});

		}
		
	}
	//console.log(" soapSave instanciated"); 
 	return func;
};


