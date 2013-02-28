/*Outgoing Controller*/
App.controller('OutgoingsCtrl', function OutgoingsCtrl($scope, outgoingSrv){
	
	/**
	 * Init
	 */
    $scope.outgoings = []; 
    $scope.errMsgOutgoing = '';
    
    /**
     * Loading Outgoing
     */
    outgoingSrv.loadOutgoings();
    
    $scope.$on( 'event:loadOutgoings',
      function( event, outgoings ) {
		console.log('NG-CTRL-Outgoing :: '+outgoings.length+'Outgoings retrieved.');
		$scope.outgoings = outgoings;
      }
    );
    
    /**
     * Add Outgoing
     */
    $scope.addOutgoing = function (){
    	outgoingSrv.addOutgoing($scope.label, $scope.amount, $scope.type, null);
    };
    
    $scope.$on( 'event:addOutgoingSuccess',
      function( event, outgoing ) {
		 console.log('NG-CTRL-Outgoing :: New outgoing added successfuly: '+outgoing.id);
		 $scope.outgoings.push(outgoing);
		 $scope.label='';
		 $scope.amount=null;
		 $scope.type='';
		 $scope.errMsgOutgoing = '';
      }
    );
    
    $scope.$on( 'event:addOutgoingFailure',
      function( event, msg ) {
		console.log('NG-CTRL-Outgoing :: Failed to add new outgoing!');
		$scope.label='';
		$scope.amount = '';
		$scope.type='';
		$scope.errMsgOutgoing = msg;
      }
    );	
    
    /**
     * Remove Outgoing
     */
    
    $scope.removeOutgoing = function (outgoing){
    	outgoingSrv.removeOutgoing(outgoing);
    };
    
    $scope.$on( 'event:removeOutgoingSuccess',
      function( event, outgoing ) {
		 console.log('NG-CTRL-Outgoing :: Outgoing removed successfuly.');
		 $scope.outgoings.splice($scope.outgoings.indexOf(outgoing), 1);
		 $scope.errMsgOutgoing = '';
      }
    );
    
    $scope.$on( 'event:removeOutgoingFailure',
      function( event, msg ) {
		console.log('NG-CTRL-Outgoing :: Failed to remove outgoing!');
		$scope.errMsgOutgoing = msg;
      }
    );	
    
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