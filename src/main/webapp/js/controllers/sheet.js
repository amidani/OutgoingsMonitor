/*Sheets Controller*/
App.controller('SheetsCtrl', function SheetsCtrl($scope, $http, authenticationService){
	$scope.currentSheet;
	$scope.sheetId;
	
	var dt=new Date();
	$scope.currentMonth = mthNames[dt.getMonth()]+" "+dt.getFullYear();
	$scope.errMsgSheet = '';
	$scope.warnMsgSheet = '';
	
	//authenticationService.checkAuth(this);
	
	//Load data from WS REST...
	this.loadCurrentSheet = function(){
		$scope.warnMsgSheet = '';
		var url = serverAddress+"sheets/current/";
		$http({method: 'GET', url: url}).
	      success(function(data, status) {
	    	  console.log("Current sheet retrieved successfuly.");
	    	  $scope.currentSheet = data;
	    	  $scope.sheetId = data.id;
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
	    	  $scope.sheetId = data.id;
	    	  console.log("Sheet added successfuly with id=["+data.id+"]");
	    	  $scope.warnMsgSheet = (data.id==null?'No sheet added for the current month!':'');
	      	  $scope.errMsgSheet = '';
	      }).
	      error(function(data, status) {
	    	  console.log("Request failed [Status : "+status+"]");
	    	  $scope.errMsgSheet = 'Service is unavailable for the moment.';
	      });
    };
    /*Sheet's Earnings*/
    $scope.addEarning = function (){
		if($scope.label=='' || $scope.amount==null){
			$scope.warnMsgSheet = 'Please make sure you fill all required inputs!';
			return;
		}
    	//persistenceREST.addEarning($scope.label, $scope.amount);
		var url = serverAddress+"earnings/addToSheet/"+$scope.label+"/"+$scope.amount+"/"+$scope.sheetId;
		$http({method: 'PUT', url: url}).
	      success(function(data, status) {
	    	  console.log("Earning added to the current successfuly with id=["+data+"]");
	    	  $scope.currentSheet.earnings.push({id:data, label:$scope.label, amount:$scope.amount, sheetId:$scope.sheetId});
	    	  $scope.label="";
	      	  $scope.amount=null;
	      	  $scope.errMsgSheet = '';
	      }).
	      error(function(data, status) {
	    	  console.log("Request failed [Status : "+status+"]");
	    	  $scope.errMsgSheet = 'Service is unavailable for the moment.';
	      });
    };
    $scope.removeEarning = function (earning){
    	var url = serverAddress+"earnings/delete/"+earning.id;
		$http({method: 'DELETE', url: url}).
	      success(function(data, status) {
	    	  if(data){
	    		  console.log("Earning deleted successfuly.");
	    		  $scope.currentSheet.earnings.splice($scope.currentSheet.earnings.indexOf(earning), 1);
	    		  $scope.errMsgSheet = '';
	    	  }else{
	    		  $scope.errMsgSheet = 'Unable to delete earning with id['+earning.id+'].';
	    	  }  
	      }).
	      error(function(data, status) {
	    	  console.log("Request failed [Status : "+status+"]");
	    	  $scope.errMsgSheet = 'Service is unavailable for the moment.';
	      });
    };
    
    /*Sheet's Outgoings*/   
    $scope.addOutgoing = function (){
    	if($scope.label=='' || $scope.amount==null){
			$scope.warnMsgSheet = 'Please make sure you fill all required inputs!';
			return;
		}
    	//persistenceREST.addEarning($scope.label, $scope.amount);
		var url = serverAddress+"outgoings/addToSheet/"+$scope.label+"/"+$scope.amount+"/"+$scope.type+"/"+$scope.sheetId;
		$http({method: 'PUT', url: url}).
	      success(function(data, status) {
	    	  console.log("Outgoing added successfuly with id=["+data+"]");
	    	  $scope.currentSheet.outgoings.push({id:data, label:$scope.label, amount:$scope.amount, type:$scope.type, sheetId:$scope.sheetId, spent:false});
	    	  $scope.label="";
	      	  $scope.amount=null;
	      	  $scope.type="";
	      	  $scope.errMsgSheet = '';
	      }).
	      error(function(data, status) {
	    	  console.log("Request failed [Status : "+status+"]");
	    	  $scope.errMsgSheet = 'Service is unavailable for the moment.';
	      });
    };
    
    $scope.removeOutgoing = function (outgoing){
    	var url = serverAddress+"outgoings/delete/"+outgoing.id;
		$http({method: 'DELETE', url: url}).
	      success(function(data, status) {
	    	  if(data){
	    		  console.log("Outgoing deleted successfuly.");
	    		  $scope.currentSheet.outgoings.splice($scope.currentSheet.outgoings.indexOf(outgoing), 1);
	    		  $scope.errMsgSheet = '';
	    	  }else{
	    		  $scope.errMsgSheet = 'Unable to delete outgoing with id['+outgoing.id+'].';
	    	  }  
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
	    	  console.log("Outgoing marked as spent successfuly with id=["+outgoing.id+"]");
	      	  $scope.errMsgSheet = '';
	      }).
	      error(function(data, status) {
	    	  console.log("Request failed [Status : "+status+"]");
	    	  $scope.errMsgSheet = 'Service is unavailable for the moment.';
	      });
    };  
    
    $scope.getTotalEarnings = function (){
    	var sum = 0;
    	if($scope.currentSheet){
	    	for (var i=0;i<$scope.currentSheet.earnings.length;i++){
	    		sum+=$scope.currentSheet.earnings[i].amount;
	    	}
    	}
    	return sum;
    };
    
    $scope.getTotalMonthlyOutgoings = function (){
    	var sum = 0;
    	if($scope.currentSheet){
	    	for (var i=0;i<$scope.currentSheet.outgoings.length;i++){
	    		if($scope.currentSheet.outgoings[i].type==="M")
	    			sum+=$scope.currentSheet.outgoings[i].amount;
	    	}
    	}
    	return sum;
    };
    
    $scope.getTotalOtherOutgoings = function (){
    	var sum = 0;
    	if($scope.currentSheet){
	    	for (var i=0;i<$scope.currentSheet.outgoings.length;i++){
	    		if($scope.currentSheet.outgoings[i].type==="O")
	    			sum+=$scope.currentSheet.outgoings[i].amount;
	    	}
    	}
    	return sum;
    };
    
    $scope.getTotalSpentOutgoings = function (flag){
    	var sum = 0;
    	if($scope.currentSheet){
	    	for (var i=0;i<$scope.currentSheet.outgoings.length;i++){
	    		if($scope.currentSheet.outgoings[i].spent===flag)
	    			sum+=$scope.currentSheet.outgoings[i].amount;
	    	}
    	}
    	return sum;
    };
    
});