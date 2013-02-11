/*Home Controller*/
App.controller('HomeCtrl', function SheetsCtrl($scope, $http){
	$scope.loggedIn = false;
	$scope.email = '';
	$scope.iframeSrc = '';
	this.checkAuth = function(){
		var url = serverAddress+"auth/check";
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
	};
	
	this.checkAuth();
});