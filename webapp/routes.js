/*var router = express.Router();
var mongo = require('mongodb');
var assert = require('assert');

var url = 'mongodb://localhost:27017/neat';
*/
/*router.get('/', function(req, res, next) {
    res.render('/features/dataentry/dataentry.html');
})*/

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