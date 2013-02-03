/*Outgoing Controller*/
App.controller('OutgoingsCtrl', function OutgoingsCtrl($scope, persistencejs){
	
	//Init
    $scope.outgoings = []; 
    
    //Load data from WebSQL...
	this.loadOutgoings = function(){
		persistencejs.fetchAllOutgoings(this);
	};
	this.loadOutgoings();
    
    $scope.addOutgoing = function (){
    	var id = persistencejs.addOutgoing($scope.label, $scope.amount, $scope.type);
    	$scope.outgoings.push({id:id, label: $scope.label, amount:$scope.amount, type:$scope.type});
    	$scope.label="";
    	$scope.amount=null;
    	$scope.type="";
    };
    
    $scope.removeOutgoing = function (outgoing){
    	persistencejs.removeOutgoing(outgoing.id);
    	$scope.outgoings.splice($scope.outgoings.indexOf(outgoing), 1);
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