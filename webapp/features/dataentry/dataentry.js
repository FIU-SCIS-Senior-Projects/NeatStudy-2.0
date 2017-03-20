


(function(){
angular.module('dataentry', ['dataentryservice'])

.controller('dataentry', ['$scope','dataentry_service', function($scope,dataentry_service) {

$scope.joyValues={};
$scope.joySum = 0;
$scope.passionValues={};
$scope.passionSum = 0;
$scope.givingValues={};
$scope.givingSum = 0;
$scope.m_name={};
$scope.m_name1={};
$scope.startDate;
$scope.endDate;
$scope.week;
$scope.currentNavItem = 'joy';


	init();

function init(){
		dataentry_service.getJoy_data(function(data){
				$scope.length = data.length;
		  for(var i =0; i<data.length; i++){
				  	$scope['days_joy'+i] = [];
				  	$scope['progress'+i] = 0;
				  	$scope.values['progress'+i]=0;

				  }
		$scope.joy_data = data;

	});
$scope.joy = function(){
	dataentry_service.getJoy_data(function(data){
				$scope.length = data.length;
		  for(var i =0; i<data.length; i++){
				  	$scope['days_joy'+i] = [];
				  	$scope['progress'+i] = 0;
				  	$scope.joyValues['progress'+i]=0;

				  }
		$scope.joy_data = data;

	});
}

$scope.passion = function(){
	dataentry_service.getPassion_data(function(data){
				$scope.length = data.length;
		  for(var i =0; i<data.length; i++){
				  	$scope['days_passion'+i] = [];
				  	$scope['progress'+i] = 0;
				  	$scope.passionValues['progress'+i]=0;

				  }
		$scope.passion_data = data;

	});
}

$scope.giving = function(){
	dataentry_service.getGiving_data(function(data){
				$scope.length = data.length;
		  for(var i =0; i<data.length; i++){
				  	$scope['days_giving'+i] = [];
				  	$scope['progress'+i] = 0;
				  	$scope.givingValues['progress'+i]=0;

				  }
		$scope.giving_data = data;

	});
}

}

$scope.joyChange= function(index,check,value){
		var a = 'days_joy'+index;
		var p = 'progress'+index;
		if(check){
			$scope[a].push(value);

			if($scope.joySum < 12)
				$scope.joyValues[p] += 8.333;
			$scope.joySum++;

		}

		else{
			$scope[a].splice($scope[a].indexOf(value), 1);
			if($scope.joySum <= 12)
				$scope.joyValues[p] -= 8.333;
			$scope.joySum--;

		}

		/*dataentry_service.saveJoy_data(function(data){
				data.length = $scope.length;
		  for(var i =0; i<data.length; i++){
				  	data.scores = $scope['days_joy'+i];
				  	data.progress = $scope['progress'+i];
				  }
		data = $scope.joy_data;

	});*/
}

$scope.passionChange= function(index,check,value){
		var a = 'days_passion'+index;
		var p = 'progress'+index;
		if(check){
			$scope[a].push(value);

			if($scope.passionSum < 9)
				$scope.passionValues[p] += 11.111;
			$scope.passionSum++;

		}

		else{
			$scope[a].splice($scope[a].indexOf(value), 1);
			if($scope.passionSum <= 12)
				$scope.passionValues[p] -= 11.111;
			$scope.passionSum--;

		}
}

$scope.givingChange= function(index,check,value){
		var a = 'days_giving'+index;
		var p = 'progress'+index;
		if(check){
			$scope[a].push(value);

			if($scope.givingSum < 3)
				$scope.givingValues[p] += 33.333;
			$scope.givingSum++;

		}

		else{
			$scope[a].splice($scope[a].indexOf(value), 1);
			if($scope.givingSum <= 3)
				$scope.givingValues[p] -= 33.333;
			$scope.givingSum--;

		}
}

$scope.next = function(atName)
{
	$scope.currentNavItem = atName;
};

 $scope.initDatepicker = function(){
        angular.element(".md-datepicker-button").each(function(){
            var el = this;
            var ip = angular.element(el).parent().find("input").bind('click', function(e){
                angular.element(el).click();
            });
            angular.element(this).css('visibility', 'hidden');
        });
    };


$scope.sDate = function(startingDate,endDate){
	//$scope.date=startingDate.getDate();
	//$scope.endDate= startingDate.getDate()+parseInt(13);
			var range=[];
			var range1=[];
			var name="name";
			var counter = 0;
			var d=0;
			var itr = moment.twix(startingDate,endDate).iterate("days");
			while(itr.hasNext()){
			if(counter<=6){
			d = itr.next().format("D");
			range.push({name: d});
			$scope.m_name['name'+counter]= d;
			}
			else{
			d = itr.next().format("D");
			range1.push({name: d});
			$scope.m_name1['name'+counter]=d;
			}
			counter++;
			//range[name] = itr.next().format("D");
			//range.push('name', itr.next().format("D"));
			}
			console.log($scope.m_name);
			$scope.dateArray = range;
			$scope.dateArray1 = range1;


				if(startingDate.getDay()==0) $scope.week = ['S','M','T','W','Th','F','Sa'];
				else if(startingDate.getDay()==1) $scope.week = ['M','T','W','Th','F','Sa','S'];
				else if(startingDate.getDay()==2) $scope.week = ['T','W','Th','F','Sa','S','M'];
				else if(startingDate.getDay()==3) $scope.week = ['W','Th','F','Sa','S','M','T'];
				else if(startingDate.getDay()==4) $scope.week = ['Th','F','Sa','S','M','T','W'];
				else if(startingDate.getDay()==5) $scope.week = ['F','Sa','S','M','T','W','Th'];
				else if(startingDate.getDay()==6) $scope.week = ['Sa','S','M','T','W','Th','F'];




				$('.Days').css('display', 'block');

}

}])

})();
