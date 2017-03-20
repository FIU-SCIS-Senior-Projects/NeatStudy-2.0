angular.module('activity', [])
	.controller('activity', ['$scope','dataentry_service', function($scope,dataentry_service)
	{
$scope.joy_array=[];
$scope.currentNavItem = 'joy';
$scope.savejoy = function(act){
$('#'+act).css('background-color', 'red').css('color', 'white');
$scope.joy_array.push({'activity_name':act});
}

$scope.create = function(){
dataentry_service.createActivity($scope.joy_array);
}

$scope.next = function(atName)
	{
		$scope.currentNavItem = atName;
	};

}]);
