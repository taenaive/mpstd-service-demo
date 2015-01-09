'use strict';

angular.module('mpstdServiceDemoApp')
  .controller('ApplicantServicesCtrl', function ($scope, $http, Auth, User) {
    $scope.message = 'Hello';

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
