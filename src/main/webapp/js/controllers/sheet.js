/*Sheets Controller*/
App.controller('SheetsCtrl', function SheetsCtrl($scope, $http){
	$scope.currentSheet;
	
	var dt=new Date();
	$scope.currentMonth = mthNames[dt.getMonth()]+" "+dt.getFullYear();
	$scope.sheetId = dt.getMonth()+"-"+dt.getFullYear();
	$scope.errMsgSheet = '';
	$scope.warnMsgSheet = '';
	
	this.checkAuth = function(){
		var url = serverAddress+"auth/check";
		$http({method: 'GET', url: url}).
	      success(function(data, status) {
	    	  console.log("Logged "+data+"  Status "+status);
	    	  //window.location = data;
	      }).
	      error(function(data, status) {
	    	  console.log("Request failed [Status : "+status+"]");
	    	  if(status=='401'){
	    		  window.location=data;
	    	  }
	      });	
	};
	
	this.checkAuth();
	
	//Load data from WS REST...
	this.loadCurrentSheet = function(){
		$scope.warnMsgSheet = '';
		var url = serverAddress+"sheets/current/";
		$http({method: 'GET', url: url}).
	      success(function(data, status) {
	    	  console.log("Current sheet retrieved successfuly.");
	    	  $scope.currentSheet = data;
	    	  $scope.warnMsgSheet = (data.id==null?'No sheet added for the current month!':'');
	      }).
	      error(function(data, status) {
	    	  console.log("Request failed [Status : "+status+"]");
	      });	
	};
	
	this.loadCurrentSheet();
	
	$scope.addSheet = function (){
		var url = serverAddress+"sheets/add/"+$scope.currentMonth;
		$http({method: 'PUT', url: url}).
	      success(function(data, status) {
	    	  $scope.currentSheet = data;
	    	  console.log("Sheet added successfuly with id=["+data.id+"]");
	    	  $scope.warnMsgSheet = (data.id==null?'No sheet added for the current month!':'');
	      	  $scope.errMsgSheet = '';
	      }).
	      error(function(data, status) {
	    	  console.log("Request failed [Status : "+status+"]");
	    	  $scope.errMsgSheet = 'Service is unavailable for the moment.';
	      });
    };
    
    $scope.markOutgoingAsSpent = function (outgoing){
		var url = serverAddress+"sheets/markspent/"+outgoing.id;
		$http({method: 'PUT', url: url}).
	      success(function(data, status) {
	    	  for (var i=0;i<$scope.currentSheet.outgoings.length;i++){
	      		if($scope.currentSheet.outgoings[i].id===outgoing.id)
	      			$scope.currentSheet.outgoings[i].spent=true;
	      	  }
	    	  console.log("Outgoing marked as spent successfuly with id=["+outgoing.id+"]"+data);
	      	  $scope.errMsgSheet = '';
	      }).
	      error(function(data, status) {
	    	  console.log("Request failed [Status : "+status+"]");
	    	  $scope.errMsgSheet = 'Service is unavailable for the moment.';
	      });
    };
    
    $scope.getTotalEarnings = function (){
    	var sum = 0;
    	if($scope.currentSheet!=undefined){
	    	for (var i=0;i<$scope.currentSheet.earnings.length;i++){
	    		sum+=$scope.currentSheet.earnings[i].amount;
	    	}
    	}
    	return sum;
    };
    
    $scope.getTotalMonthlyOutgoings = function (){
    	var sum = 0;
    	if($scope.currentSheet!=undefined){
	    	for (var i=0;i<$scope.currentSheet.outgoings.length;i++){
	    		if($scope.currentSheet.outgoings[i].type==="M")
	    			sum+=$scope.currentSheet.outgoings[i].amount;
	    	}
    	}
    	return sum;
    };
});