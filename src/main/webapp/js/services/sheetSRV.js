App.service('sheetSrv', function($rootScope, $http) {
	var sheetSrv = {};
	
	sheetSrv.loadCurrentSheet = function(){		
		var url = $rootScope.serverAddress+"sheets/current/";
		$http({method: 'GET', url: url}).
	      success(function(data, status) {
	    	  console.log("NG-SRV-Sheet :: Current sheet retrieved successfuly.");
	    	  $rootScope.$broadcast('event:currentSheetSuccess', (data=='null')?null:data);
	      }).
	      error(function(data, status) {
	    	  console.log("NG-SRV-Sheet :: Request failed [Status : "+status+"]");
	    	  $rootScope.$broadcast('event:currentSheetFailure', 'Service is unavailable for the moment.');
	      });
	};
	
	sheetSrv.addSheet = function(currentMonth){
		var url = $rootScope.serverAddress+"sheets/add/"+currentMonth;
		$http({method: 'PUT', url: url}).
	      success(function(data, status) {
	    	  console.log("NG-SRV-Sheet :: Sheet added successfuly :"+data.id);
	    	  $rootScope.$broadcast('event:addSheetSuccess', data);
	      }).
	      error(function(data, status) {
	    	  console.log("NG-SRV-Sheet :: Request failed [Status : "+status+"]");
	    	  $rootScope.$broadcast('event:addSheetFailure', 'Service is unavailable for the moment.');
	      });
	};
	
	sheetSrv.markAsSpent = function(outgoing){
		var url = $rootScope.serverAddress+"sheets/markspent/"+outgoing.id;
		$http({method: 'PUT', url: url}).
	      success(function(data, status) {
	    	  console.log("NG-SRV-Sheet :: Outgoing marked as spent successfuly with id=["+outgoing.id+"]");
	      }).
	      error(function(data, status) {
	    	  console.log("NG-SRV-Sheet :: Request failed [Status : "+status+"]");
	    	  $rootScope.$broadcast('event:markAsSpentFailure', 'Service is unavailable for the moment.');
	      });
	};
	
	return sheetSrv;
});