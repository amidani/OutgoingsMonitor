App.service('outgoingSrv', function($rootScope, $http) {
	var outgoingSrv = {};
	
	outgoingSrv.loadOutgoings = function(){
		var url = $rootScope.serverAddress+"outgoings/all";
		$http({method: 'GET', url: url}).
	      success(function(data, status) {
	    	  console.log("NG-SRV-Outgoing :: List retrieved successfuly.");
	    	  var outgoings = [];
	    	  for (var i=0;i<data.length;i++){
	    		  outgoings.push(data[i]);
	      	  }
	    	  $rootScope.$broadcast('event:loadOutgoings', outgoings);
	      }).
	      error(function(data, status) {
	    	  console.log("NG-SRV-Outgoing :: Request failed [Status : "+status+"]");
	      });			
	};
	
	outgoingSrv.addOutgoing = function(label, amount, type, sheetId){
		if(label=='' || amount==null){
			$rootScope.$broadcast('event:addOutgoingFailure', 'Please make sure you fill all required inputs!');
			return;
		}
		var url = $rootScope.serverAddress+"outgoings/add/"+label+"/"+amount+"/"+type;
		if(sheetId!=null)
			url = $rootScope.serverAddress+"outgoings/addToSheet/"+label+"/"+amount+"/"+type+"/"+sheetId;
		$http({method: 'PUT', url: url}).
	      success(function(data, status) {
	    	  console.log("NG-SRV-Outgoing :: Outgoing added successfuly with id=["+data+"]");
	    	  if(sheetId == null)
	    		  $rootScope.$broadcast('event:addOutgoingSuccess', {id:data, label:label, amount:amount, type:type});
	    	  else
	    		  $rootScope.$broadcast('event:addOutgoingSuccess', {id:data, label:label, amount:amount, type:type, sheetId:sheetId});
	      }).
	      error(function(data, status) {
	    	  console.log("NG-SRV-Outgoing :: Request failed [Status : "+status+"]");
	    	  $rootScope.$broadcast('event:addOutgoingFailure', 'Service is unavailable for the moment.');
	      });
	};
	
	outgoingSrv.removeOutgoing = function(outgoing){
		var url = $rootScope.serverAddress+"outgoings/delete/"+outgoing.id;
		$http({method: 'DELETE', url: url}).
	      success(function(data, status) {
	    	  if(data){
	    		  console.log("NG-SRV-Outgoing :: Outgoing removed successfuly.");
	    		  $rootScope.$broadcast('event:removeOutgoingSuccess', outgoing);
	    	  }else{
	    		  $rootScope.$broadcast('event:removeOutgoingFailure', 'NG-SRV-Outgoing :: Unable to delete outgoing with id['+outgoing.id+'].');
	    	  }  
	      }).
	      error(function(data, status) {
	    	  console.log("NG-SRV-Outgoing :: Request failed [Status : "+status+"]");
	    	  $rootScope.$broadcast('event:removeOutgoingFailure', 'Service is unavailable for the moment.');
	      });
	};
	
	return outgoingSrv;
	
});