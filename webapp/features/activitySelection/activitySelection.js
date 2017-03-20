//var db = mongojs('neat_db',['joy'],['passion'],['giving']);

angular.module('activity', [])
	.controller('activity', ['$scope','dataentry_service', function($scope,dataentry_service)
	{
$scope.joy_array=[];
$scope.passion_array=[];
$scope.giving_array=[];
$scope.currentNavItem = 'joy';
$scope.joyCount = 0;
$scope.passionCount = 0;
$scope.givingCount = 0;

// Get the modal
var joyModal = document.getElementById('JoyModal');
var passionModal = document.getElementById('PassionModal');
var minModal = document.getElementById('MinModal');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal 
limitWarning = function(id)
{
    if(id == 0)
    {
    	joyModal.style.display = "block";
    }
    else if(id == 1)
    {
    	passionModal.style.display = "block";
    }
    else if(id == 3)
    {
    	minModal.style.display = "block";
    }
    else
    {

    }
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    joyModal.style.display = "none";
    passionModal.style.display = "none";
    minModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == joyModal) {
        joyModal.style.display = "none";
    }
    else if (event.target == passionModal) {
        passionModal.style.display = "none";
    }
    else if (event.target == minModal) {
        minModal.style.display = "none";
    }
}


$scope.savejoy = function(act)
{
	//Check for maximum Joy Activity count
	if($scope.joy_array.indexOf(act) >= 0)
	{
		$scope.joy_array.splice($scope.joy_array.indexOf(act), 1);
		$scope.joyCount--;
		$('#'+act).css('background-color', 'white').css('color', 'black');
	}
	else
	{
		if($scope.joyCount >= 3)
		{
			limitWarning(0);
		}
		else
		{
			$scope.joyCount++;
			$('#'+act).css('background-color', 'red').css('color', 'white');
			$scope.joy_array.push(act);
		}
	}	
}

$scope.savepassion = function(act)
{
	
	if($scope.passion_array.indexOf(act) >= 0)
	{
		$scope.passion_array.splice($scope.passion_array.indexOf(act), 1);
		$scope.passionCount--;
		$('#'+act).css('background-color', 'white').css('color', 'black');
	}
	else
	{
		//Check for maximum Passion Activity count
		if($scope.passionCount >= 2)
		{
			limitWarning(1);
		}
		else
		{
			$scope.passionCount++;
			$('#'+act).css('background-color', 'red').css('color', 'white');
			$scope.passion_array.push(act);
		}
	}	
}

$scope.savegiving = function(act)
{
	//Check for maximum Giving Back Activity count
	if($scope.givingCount >= 2)
	{

	}
	else
	{
		if($scope.giving_array.indexOf() >= 0)
		{
			$scope.givingCount--;
			$('#'+act).css('background-color', 'white').css('color', 'black');
		}
		else
		{
			$scope.givingCount++;
			$('#'+act).css('background-color', 'red').css('color', 'white');
			$scope.giving_array.push({'activity_name':act});
		}
	}	
}

$scope.createActivity = function(){
dataentry_service.createActivity($scope.joy_array);
}

$scope.next = function(atName)
	{
		if(($scope.currentNavItem == 'joy') && ($scope.joyCount == 0))
		{
			limitWarning(3);
		}
		else if(($scope.currentNavItem == 'passion') && ($scope.passionCount == 0))
		{
			limitWarning(3);
		}
		else
		{
			$scope.currentNavItem = atName;
		}
	};
}]);