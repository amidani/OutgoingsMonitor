/*Outgoing Controller*/
App.controller('OutgoingsCtrl', function OutgoingsCtrl($scope, $http){
	
	//Init
    $scope.outgoings = []; 
    
    //Load data from WebSQL...
	this.loadOutgoings = function(){
		$scope.errMsgOutgoing = '';
		var url = serverAddress+"outgoings/all";
		$http({method: 'GET', url: url}).
	      success(function(data, status) {
	    	  console.log("List retrieved successfuly.");
	    	  for (var i=0;i<data.length;i++){
	    		  $scope.outgoings.push(data[i]);
	      	  }
	      }).
	      error(function(data, status) {
	    	  console.log("Request failed [Status : "+status+"]");
	      });	
	};
	this.loadOutgoings();
    
    $scope.addOutgoing = function (){
    	if($scope.label=='' || $scope.amount==null){
			$scope.errMsgOutgoing = 'Please make sure you fill all required inputs!';
			return;
		}
    	//persistenceREST.addEarning($scope.label, $scope.amount);
		var url = serverAddress+"outgoings/add/"+$scope.label+"/"+$scope.amount+"/"+$scope.type;
		$http({method: 'PUT', url: url}).
	      success(function(data, status) {
	    	  console.log("Outgoing added successfuly with id=["+data+"]");
	    	  $scope.outgoings.push({id:data, label:$scope.label, amount:$scope.amount, type:$scope.type});
	    	  $scope.label="";
	      	  $scope.amount=null;
	      	  $scope.type="";
	      	  $scope.errMsgOutgoing = '';
	      }).
	      error(function(data, status) {
	    	  console.log("Request failed [Status : "+status+"]");
	    	  $scope.errMsgOutgoing = 'Service is unavailable for the moment.';
	      });
    };
    
    $scope.removeOutgoing = function (outgoing){
    	var url = serverAddress+"outgoings/delete/"+outgoing.id;
		$http({method: 'DELETE', url: url}).
	      success(function(data, status) {
	    	  if(data){
	    		  console.log("Outgoing deleted successfuly.");
	    		  $scope.outgoings.splice($scope.outgoings.indexOf(outgoing), 1);
	    		  $scope.errMsgOutgoing = '';
	    	  }else{
	    		  $scope.errMsgOutgoing = 'Unable to delete outgoing with id['+outgoing.id+'].';
	    	  }  
	      }).
	      error(function(data, status) {
	    	  console.log("Request failed [Status : "+status+"]");
	    	  $scope.errMsgOutgoing = 'Service is unavailable for the moment.';
	      });
    };
    
    $scope.getTotalMonthlyOutgoings = function (){
    	var sum = 0;
    	for (var i=0;i<$scope.outgoings.length;i++){
    		if($scope.outgoings[i].type==="M")
    			sum+=$scope.outgoings[i].amount;
    	}
    	return sum;
    };
    
    $scope.getTotalOtherOutgoings = function (){
    	var sum = 0;
    	for (var i=0;i<$scope.outgoings.length;i++){
    		if($scope.outgoings[i].type==="O")
    			sum+=$scope.outgoings[i].amount;
    	}
    	return sum;
    };
    
    this.pushOutgoing = function(id, label, amount, type){
    	$scope.outgoings.push({id:id, label:label, amount:amount, type:type});
    };
    
});