angular.module('dataentryservice',[])



.service('dataentry_service',['$http','$log',function($http,$log){

	   $log.log ('Working');


		this.getJoy_data = function(cb){
		$http({
			url: '/joy_data/',
			method: 'GET'
		})
		.then(function(resp){
			$log.log(resp.data);
			 cb(resp.data);

		},function(resp){
             $log.error('ERROR');
		})         
		}



		this.getPassion_data = function(cb){
		$http({
			url: '/passion_data/',
			method: 'GET'
		})
		.then(function(resp){
			$log.log(resp.data);
			 cb(resp.data);

		},function(resp){
             $log.error('ERROR');
		})          
		}


		this.getGivingBack_data = function(cb){
		$http({
			url: '/givingback_data/',
			method: 'GET'
		})
		.then(function(resp){
			$log.log(resp.data);
			 cb(resp.data);

		},function(resp){
             $log.error('ERROR');
		})            
		}

		this.createActivity = function(newActivity){
       $http({
            method: 'post',
            url:'/create_activity/',
            data: newActivity,
            config: 'Content-Type: application/json;'
        }).then(function (response) {
            console.log(response);
        }, function (response) {
            console.log(response);
        });
}



	}]);