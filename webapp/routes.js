angular.module('routes', ['ui.router'])
	.config(function($urlRouterProvider, $stateProvider) 
{
		$stateProvider
            .state('dataentry', {
                url: '/',
                templateUrl: '/features/dataentry/dataentry.html',
                controller: 'dataentry',
                controllerAs: 'de'
            })
            .state('activity', {
                url: '/activity',
                templateUrl: '/features/activitySelection/activitySelection.html',
                controller: 'activity',
                controllerAs: 'ac'
            })
            $urlRouterProvider.otherwise('/');

});        