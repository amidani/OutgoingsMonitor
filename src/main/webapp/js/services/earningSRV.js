App.service('earningSrv', function($rootScope, $http) {
	var earningSrv = {};
	
	earningSrv.loadEarnings = function(){
		var url = $rootScope.serverAddress+"earnings/all";
		$http({method: 'GET', url: url}).
	      success(function(data, status) {
	    	  console.log("NG-SRV-Earning :: List retrieved successfuly.");
	    	  var earnings = [];
	    	  for (var i=0;i<data.length;i++){
	    		  earnings.push(data[i]);
	      	  }
	    	  $rootScope.$broadcast('event:loadEarnings', earnings);
	      }).
	      error(function(data, status) {
	    	  console.log("NG-SRV-Earning :: Request failed [Status : "+status+"]");
	      });	
	};
	
	earningSrv.addEarning = function(label, amount, sheetId){
		if(label=='' || amount==null){
			$rootScope.$broadcast('event:addEarningFailure', 'Please make sure you fill all required inputs!');
			return;
		}
		var url = $rootScope.serverAddress+"earnings/add/"+label+"/"+amount;
		if(sheetId != null)
			url = $rootScope.serverAddress+"earnings/addToSheet/"+label+"/"+amount+"/"+sheetId;
		$http({method: 'PUT', url: url}).
	      success(function(data, status) {
	    	  console.log("NG-SRV-Earning :: Earning added successfuly with id=["+data+"]");
	    	  if(sheetId == null)
	    		  $rootScope.$broadcast('event:addEarningSuccess', {id:data, label:label, amount:amount});
	    	  else
	    		  $rootScope.$broadcast('event:addEarningSuccess', {id:data, label:label, amount:amount, sheetId:sheetId});
	      }).
	      error(function(data, status) {
	    	  console.log("NG-SRV-Earning :: Request failed [Status : "+status+"]");
	    	  $rootScope.$broadcast('event:addEarningFailure', 'Service is unavailable for the moment.');
	      });
	};
	
	earningSrv.removeEarning = function(earning){
		var url = $rootScope.serverAddress+"earnings/delete/"+earning.id;
		$http({method: 'DELETE', url: url}).
	      success(function(data, status) {
	    	  if(data){
	    		  console.log("NG-SRV-Earning :: Earning removed successfuly.");
	    		  $rootScope.$broadcast('event:removeEarningSuccess', earning);
	    	  }else{
	    		  $rootScope.$broadcast('event:removeEarningFailure', 'Unable to delete earning with id['+earning.id+'].');
	    	  }  
	      }).
	      error(function(data, status) {
	    	  console.log("NG-SRV-Earning :: Request failed [Status : "+status+"]");
	    	  $rootScope.$broadcast('event:removeEarningFailure', 'Service is unavailable for the moment.');
	      });
	};
	
	return earningSrv;
});