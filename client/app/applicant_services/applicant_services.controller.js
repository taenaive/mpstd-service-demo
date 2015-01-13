'use strict';

angular.module('mpstdServiceDemoApp')
  .controller('ApplicantServicesCtrl', function ($scope, $http, Auth, User,commonFactory) {
    // getApplicant   
    $scope.fireGetApplicant = function(applicantid){
    	commonFactory.getApplicant(applicantid)   
         .success(function( result ){
         			console.log(JSON.stringify(result));

         		  })
                  .error(function (error) {
                      $scope.model.applicantInfo ={};
                     // console.log( 'Unable to load customer data <<getApplicant>>: ');
                  });

    }
   

     $scope.showContent = function($fileContent){
        $scope.content = $fileContent;
    };

  });

angular.module('mpstdServiceDemoApp')
	.directive('onReadFile', function ($parse) {
	return {
		restrict: 'A',
		scope: false,
		link: function(scope, element, attrs) {
            var fn = $parse(attrs.onReadFile);
            
			element.on('change', function(onChangeEvent) {
				var reader = new FileReader();
                
				reader.onload = function(onLoadEvent) {
					scope.$apply(function() {
						fn(scope, {$fileContent:onLoadEvent.target.result});
					});
				};

				reader.readAsText((onChangeEvent.srcElement || onChangeEvent.target).files[0]);
			});
		}
	};
});
