var App = angular.module('outgoingMonitor', []);
App.run(['$rootScope', '$http',  function($scope, $http) {
	$scope.serverAddress = "/omsrv/";
	$scope.mthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
	
	$scope.checkAuth = function(){
		var url = $scope.serverAddress+"auth/check";
		if(!$scope.loggedIn){
			$http({method: 'GET', url: url}).
		      success(function(data, status) {
		    	  console.log("Logged "+data+"  Status "+status);
		    	  $scope.loggedIn = true;
		    	  $scope.email = data;
		      }).
		      error(function(data, status) {
		    	  console.log("Request failed [Status : "+status+"]");
		    	  if(status=='401'){
		    		  window.location = data;
		    	  }
		      });
		}
	};
	
	$scope.logout = function(){
		var url = $scope.serverAddress+"auth/logout";
		$http({method: 'GET', url: url}).
	      success(function(data, status) {
	    	  console.log("Logout...");
    		  window.location = data;
	      }).
	      error(function(data, status) {
	    	  console.log("Failed to logout [Status : "+status+"]");
	      });
	};
  }
]);
App.Controllers = {};
