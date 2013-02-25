/*Home Controller*/
App.controller('HomeCtrl', function HomeCtrl($scope, $http, authenticationService){
	$scope.loggedIn = false;
	$scope.email = '';
	
	authenticationService.checkAuth(this);
	
	this.updateValuesAfterLogin = function(loggedIn, email){
		$scope.loggedIn = loggedIn;
		$scope.email = email;
	};
		
	$scope.disconnect = function(){
		$scope.loggedIn = false;
		$scope.email = '';
		authenticationService.logout();
	};
	
});