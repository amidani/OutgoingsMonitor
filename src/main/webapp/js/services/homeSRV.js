App.service('authenticationService', function($rootScope, $http) {
	var authService = {};
	
	authService.logout = function(){
		var url = serverAddress+"auth/logout";
		$http({method: 'GET', url: url}).
	      success(function(data, status) {
	    	  console.log("Logout...");
    		  window.location = data;
	      }).
	      error(function(data, status) {
	    	  console.log("Failed to logout [Status : "+status+"]");
	      });
	};
	
	authService.checkAuth = function(controller){
		var url = serverAddress+"auth/check";
		$http({method: 'GET', url: url}).
	      success(function(data, status) {
	    	  console.log("Logged "+data+"  Status "+status);
	    	  controller.updateValuesAfterLogin(true, data);
	      }).
	      error(function(data, status) {
	    	  console.log("Request failed [Status : "+status+"]");
	    	  if(status=='401'){
	    		  window.location = data;
	    	  }
	      });	
	};
	
	return authService;
		
});