


(function(){
angular.module('dataentry', ['dataentryservice'])

.controller('dataentry', ['$scope','dataentry_service', function($scope,dataentry_service) {

$scope.joyValues={};
$scope.joyCounts = 0;
$scope.passionValues={};
$scope.passionCounts = 0;
$scope.givingValues={};
$scope.givingCounts = 0;
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
				  	$scope['days_joy'+i] = data[i].scores;
				  	$scope['progress'+i] = data[i].progress;
				  	$scope.joyValues['progress'+i] = data[i].progress;

				  }
		$scope.joy_data = data;

	});
}

$scope.saveJoy = function(data){dataentry_service.saveJoy_data(data)};

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

/*dataentry_service.saveJoy_data(function(data){
				data.length = $scope.length;
		  for(var i =0; i<data.length; i++){
				  	data.scores = $scope['days_joy'+i];
				  	data.progress = $scope['progress'+i];
				  }
		data = $scope.joy_data;

	});*/

$scope.joyChange= function(save,activity,index,check,value){
		var a = 'days_joy'+index;
		var p = 'progress'+index;
		if(check){
				$scope[a].push(value);
				$scope.joyCounts++;
				if($scope.joyCounts > 12){
					$scope.joyValues[p] = 100;
				}
				else{
					$scope.joyValues[p] = 100 * $scope.joyCounts / 12;
				}
		}

		else{
			$scope[a].splice($scope[a].indexOf(value), 1);
			$scope.joyCounts--;
			if($scope.joyCounts > 12){
				$scope.joyValues[p] = 100;
			}
			else{
				$scope.joyValues[p] = 100 * $scope.joyCounts / 12;
			}
		}

		//if(save == true)
			$scope.saveJoy([activity, $scope[a], $scope.joyValues[p]]);
}

$scope.passionChange= function(index,check,value){
		var a = 'days_passion'+index;
		var p = 'progress'+index;
		if(check){
				$scope[a].push(value);
				$scope.passionCounts[p]++;
				if($scope.passionCounts[p] > 12){
					$scope.passionValues[p] = 100;
				}
				else{
					$scope.passionValues[p] = 100 * $scope.passionCounts[p] / 12;
				}
		}

		else{
			$scope[a].splice($scope[a].indexOf(value), 1);
			$scope.passionCounts[p]--;
			if($scope.passionCounts[p] > 12){
				$scope.passionValues[p] = 100;
			}
			else{
				$scope.passionValues[p] = 100 * $scope.passionCounts[p] / 12;
			}
		}
}

$scope.givingChange= function(index,check,value){
		var a = 'days_giving'+index;
		var p = 'progress'+index;
		if(check){
				$scope[a].push(value);
				$scope.givingCounts[p]++;
				if($scope.givingCounts[p] > 12){
					$scope.givingValues[p] = 100;
				}
				else{
					$scope.givingValues[p] = 100 * $scope.givingCounts[p] / 12;
				}
		}

		else{
			$scope[a].splice($scope[a].indexOf(value), 1);
			$scope.givingCounts[p]--;
			if($scope.givingCounts[p] > 12){
				$scope.givingValues[p] = 100;
			}
			else{
				$scope.givingValues[p] = 100 * $scope.givingCounts[p] / 12;
			}
		}
}

$scope.isChecked = function(act, date)
{
	return (act.scores.indexOf(parseInt(date.name, 10)) != -1);
};

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


$scope.sDate = function(){
var startingDate = arguments[0];
	if(arguments.length ==1){
		var number_of_weeks = 2;
	}

	else if(arguments.length == 2){
		if(arguments[1]==1)
			var number_of_weeks = 1;
		else if(arguments[1]==2)
			var number_of_weeks = 2;
	}

	$('.Days').css('display', 'none');

	var eDate;
	if(number_of_weeks == 1){
		eDate= moment(startingDate).add(6, 'days');
		$scope.endDate = new Date(eDate);
	}
	else if(number_of_weeks == 2){
		eDate= moment(startingDate).add(13, 'days');
		$scope.endDate = new Date(eDate);
	}

			var range=[];
			var range1=[];
			var name="name";
			var counter = 0;
			var d=0;
			var itr = moment.twix(startingDate,eDate).iterate("days");
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
			$scope.dateArray1 = range1;
			$scope.dateArray = range;



				if(startingDate.getDay()==0) $scope.week = ['S','M','T','W','Th','F','Sa'];
				else if(startingDate.getDay()==1) $scope.week = ['M','T','W','Th','F','Sa','S'];
				else if(startingDate.getDay()==2) $scope.week = ['T','W','Th','F','Sa','S','M'];
				else if(startingDate.getDay()==3) $scope.week = ['W','Th','F','Sa','S','M','T'];
				else if(startingDate.getDay()==4) $scope.week = ['Th','F','Sa','S','M','T','W'];
				else if(startingDate.getDay()==5) $scope.week = ['F','Sa','S','M','T','W','Th'];
				else if(startingDate.getDay()==6) $scope.week = ['Sa','S','M','T','W','Th','F'];




				$('.Days').css('display', 'inline-flex');

}

}])

})();
