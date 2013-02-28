/*Sheets Controller*/
App.controller('SheetsCtrl', function SheetsCtrl($scope, sheetSrv, earningSrv, outgoingSrv){
	$scope.currentSheet = null;
	$scope.sheetId;
	
	var dt=new Date();
	$scope.currentMonth = $scope.mthNames[dt.getMonth()]+" "+dt.getFullYear();
	$scope.errMsgSheet = '';
	$scope.warnMsgSheet = '';
	
	/**
	 * Load Current Sheet
	 */	
	sheetSrv.loadCurrentSheet();
	
	$scope.$on( 'event:currentSheetSuccess',
      function( event, currentSheet ) {
		if(currentSheet!=null){
		 console.log('NG-CTRL-Sheet :: Current sheet retrieved successfuly: '+currentSheet.id);
		 $scope.currentSheet = currentSheet;
	   	 $scope.sheetId = currentSheet.id;
	   	 $scope.warnMsgSheet = '';
		}else{
			$scope.warnMsgSheet = 'No sheet added for the current month!';
		}
      }
    );
	
	$scope.$on( 'event:currentSheetFailure',
	  function( event, msg ) {
		$scope.warnMsgSheet = '';
		$scope.errMsgSheet = msg;		
	  }
	);
	
	$scope.addSheet = function (){
		sheetSrv.addSheet($scope.currentMonth);
    };
    
    $scope.$on( 'event:addSheetSuccess',
      function( event, newSheet ) {
		 console.log('NG-CTRL-Sheet :: New sheet added successfuly: '+newSheet.id);
		 $scope.currentSheet = newSheet;
	   	 $scope.sheetId = newSheet.id;
	   	 $scope.warnMsgSheet = (newSheet.id==null?'No sheet added for the current month!':'');
      }
    );
    
    $scope.$on( 'event:addSheetFailure',
      function( event, msg ) {
		 console.log('NG-CTRL-Sheet :: Failed to add new sheet.');
	   	 $scope.errMsgSheet = msg;
      }
    );
    
    /**
     * Sheet's Earnings
     */
    $scope.addEarning = function (){
    	earningSrv.addEarning($scope.label, $scope.amount, $scope.sheetId);
    };
    
    $scope.$on( 'event:addEarningSuccess',
      function( event, earning ) {
		console.log('NG-CTRL-Sheet :: New earning added to sheet successfuly: '+earning.id);
		$scope.currentSheet.earnings.push(earning);
		$scope.label = '';
		$scope.amount = '';
		$scope.errMsgSheet = '';
      }
    );
    
    $scope.$on( 'event:addEarningFailure',
      function( event, msg ) {
		console.log('NG-CTRL-Sheet :: Failed to add new earning to the sheet!');
		$scope.label = '';
		$scope.amount = '';
		$scope.errMsgSheet = msg;
      }
    );	
    
    $scope.removeEarning = function (earning){
    	earningSrv.removeEarnings(earning);
    };
    
    $scope.$on( 'event:removeEarningSuccess',
      function( event, earning ) {
		console.log('NG-CTRL-Sheet :: Earning removed from sheet successfuly: '+earning.id);
		$scope.currentSheet.earnings.splice($scope.currentSheet.earnings.indexOf(earning), 1);
		$scope.errMsgSheet = '';
      }
    );
    
    $scope.$on( 'event:removeEarningFailure',
      function( event, msg ) {
		console.log('NG-CTRL-Earning :: Failed to remove earning from sheet!');
		$scope.errMsgSheet = msg;
      }
    );	
    
    /**
     * Sheet's Outgoings
     */   
    $scope.addOutgoing = function (){
    	 outgoingSrv.addOutgoing($scope.label, $scope.amount, $scope.type, $scope.sheetId);
    };
    
    $scope.$on( 'event:addOutgoingSuccess',
      function( event, outgoing ) {
		 console.log('NG-CTRL-Sheet :: New outgoing added to the successfuly: '+outgoing.id);
		 $scope.currentSheet.outgoings.push(outgoing);
		 $scope.label='';
		 $scope.amount=null;
		 $scope.type='';
		 $scope.errMsgSheet = '';
      }
    );
    
    $scope.$on( 'event:addOutgoingFailure',
      function( event, msg ) {
		console.log('NG-CTRL-Sheet :: Failed to add new outgoing to sheet!');
		$scope.label='';
		$scope.amount = '';
		$scope.type='';
		$scope.errMsgSheet = msg;
      }
    );
    
    $scope.removeOutgoing = function (outgoing){
    	outgoingSrv.removeOutgoing(outgoing);
    };
    
    $scope.$on( 'event:removeOutgoingSuccess',
      function( event, outgoing ) {
		 console.log('NG-CTRL-Sheet :: Outgoing removed from sheetsuccessfuly.');
		 $scope.currentSheet.outgoings.splice($scope.currentSheet.outgoings.indexOf(outgoing), 1);
		 $scope.errMsgSheet = '';
      }
    );
    
    $scope.$on( 'event:removeOutgoingFailure',
      function( event, msg ) {
		console.log('NG-CTRL-Sheet :: Failed to remove outgoing from the sheet!');
		$scope.errMsgSheet = msg;
      }
    );
    
    $scope.markOutgoingAsSpent = function (outgoing){
		sheetSrv.markAsSpent(outgoing);
    };  
    
    $scope.$on( 'event:markAsSpentFailure',
      function( event, msg ) {
		console.log('NG-CTRL-Sheet :: Failed to mark outgoing as spent!');
		$scope.errMsgSheet = msg;
		
      }
    );
    
    $scope.getTotalEarnings = function (){
    	var sum = 0;
    	if($scope.currentSheet!=null){
	    	for (var i=0;i<$scope.currentSheet.earnings.length;i++){
	    		sum+=$scope.currentSheet.earnings[i].amount;
	    	}
    	}
    	return sum;
    };
    
    $scope.getTotalMonthlyOutgoings = function (){
    	var sum = 0;
    	if($scope.currentSheet!=null){
	    	for (var i=0;i<$scope.currentSheet.outgoings.length;i++){
	    		if($scope.currentSheet.outgoings[i].type==="M")
	    			sum+=$scope.currentSheet.outgoings[i].amount;
	    	}
    	}
    	return sum;
    };
    
    $scope.getTotalOtherOutgoings = function (){
    	var sum = 0;
    	if($scope.currentSheet!=null){
	    	for (var i=0;i<$scope.currentSheet.outgoings.length;i++){
	    		if($scope.currentSheet.outgoings[i].type==="O")
	    			sum+=$scope.currentSheet.outgoings[i].amount;
	    	}
    	}
    	return sum;
    };
    
    $scope.getTotalSpentOutgoings = function (flag){
    	var sum = 0;
    	if($scope.currentSheet!=null){
	    	for (var i=0;i<$scope.currentSheet.outgoings.length;i++){
	    		if($scope.currentSheet.outgoings[i].spent===flag)
	    			sum+=$scope.currentSheet.outgoings[i].amount;
	    	}
    	}
    	return sum;
    };
    
});