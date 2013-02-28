/*Earnings Controller*/
App.controller('EarningsCtrl', function EarningsCtrl($scope, earningSrv){
	/**
	 *Init
	 */
	$scope.earnings =  [];
	$scope.errMsgEarning = '';
	
	/**
	 * Load Earnings	
	 */
	earningSrv.loadEarnings();
	
	$scope.$on( 'event:loadEarnings',
      function( event, earnings ) {
		console.log('NG-CTRL-Earning :: '+earnings.length+'Earnings retrieved.');
		$scope.earnings = earnings;
      }
    );
	
	/**
	 * Add Earning
	 */
	
	$scope.addEarning = function (){
		earningSrv.addEarning($scope.label, $scope.amount, null);
    };
    
    $scope.$on( 'event:addEarningSuccess',
      function( event, earning ) {
		console.log('NG-CTRL-Earning :: New earning added successfuly: '+earning.id);
		$scope.earnings.push(earning);
		$scope.label = '';
		$scope.amount = '';
		$scope.errMsgEarning = '';
      }
    );
    
    $scope.$on( 'event:addEarningFailure',
      function( event, msg ) {
		console.log('NG-CTRL-Earning :: Failed to add new earning!');
		$scope.label = '';
		$scope.amount = '';
		$scope.errMsgEarning = msg;
      }
    );	
    
    /**
     * Remove Earning
     */
    
    $scope.removeEarning = function (earning){
    	earningSrv.removeEarning(earning);
    };
    
    $scope.$on( 'event:removeEarningSuccess',
      function( event, earning ) {
		console.log('NG-CTRL-Earning :: Earning removed successfuly: '+earning.id);
		$scope.earnings.splice($scope.earnings.indexOf(earning), 1);
		$scope.errMsgEarning = '';
      }
    );
    
    $scope.$on( 'event:removeEarningFailure',
      function( event, msg ) {
		console.log('NG-CTRL-Earning :: Failed to remove earning!');
		$scope.errMsgEarning = msg;
      }
    );	
    
    $scope.getTotalEarnings = function (){
    	var sum = 0;
    	for (var i=0;i<$scope.earnings.length;i++){
    		sum+=$scope.earnings[i].amount;
    	}
    	return sum;
    };
});

