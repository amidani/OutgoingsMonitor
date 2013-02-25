/*Earnings Controller*/
App.controller('EarningsCtrl', function EarningsCtrl($scope, $http){
	//Init
	$scope.earnings =  [];
	//Load data from WS REST...
	this.loadEarnings = function(){
		$scope.errMsgEarning = '';
		var url = serverAddress+"earnings/all";
		$http({method: 'GET', url: url}).
	      success(function(data, status) {
	    	  console.log("List retrieved successfuly.");
	    	  for (var i=0;i<data.length;i++){
	    		  $scope.earnings.push(data[i]);
	      	  }
	      }).
	      error(function(data, status) {
	    	  console.log("Request failed [Status : "+status+"]");
	      });	
	};
	this.loadEarnings();
	
	$scope.addEarning = function (){
		if($scope.label=='' || $scope.amount==null){
			$scope.errMsgEarning = 'Please make sure you fill all required inputs!';
			return;
		}
    	//persistenceREST.addEarning($scope.label, $scope.amount);
		var url = serverAddress+"earnings/add/"+$scope.label+"/"+$scope.amount;
		$http({method: 'PUT', url: url}).
	      success(function(data, status) {
	    	  console.log("Earning added successfuly with id=["+data+"]");
	    	  $scope.earnings.push({id:data, label:$scope.label, amount:$scope.amount});
	    	  $scope.label="";
	      	  $scope.amount=null;
	      	  $scope.errMsgEarning = '';
	      }).
	      error(function(data, status) {
	    	  console.log("Request failed [Status : "+status+"]");
	    	  $scope.errMsgEarning = 'Service is unavailable for the moment.';
	      });
    };
    
    $scope.removeEarning = function (earning){
    	//persistenceREST.removeEarning(earning.id);
    	var url = serverAddress+"earnings/delete/"+earning.id;
		$http({method: 'DELETE', url: url}).
	      success(function(data, status) {
	    	  if(data){
	    		  console.log("Earning deleted successfuly.");
	    		  $scope.earnings.splice($scope.earnings.indexOf(earning), 1);
	    		  $scope.errMsgEarning = '';
	    	  }else{
	    		  $scope.errMsgEarning = 'Unable to delete earning with id['+earning.id+'].';
	    	  }  
	      }).
	      error(function(data, status) {
	    	  console.log("Request failed [Status : "+status+"]");
	    	  $scope.errMsgEarning = 'Service is unavailable for the moment.';
	      });
    };
    
    $scope.getTotalEarnings = function (){
    	var sum = 0;
    	for (var i=0;i<$scope.earnings.length;i++){
    		sum+=$scope.earnings[i].amount;
    	}
    	return sum;
    };
    
    this.pushEarning = function(earning){
    	$scope.earnings.push(earning);
    };
	
});

