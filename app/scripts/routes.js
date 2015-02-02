var ng = angular
;(function(){
	'use strict';

	ng.module('CListApp')

	.config(function($routeProvider, $locationProvider){
		$routeProvider
		.when('/', {
			templateUrl: 'views/main.html',
			controller: 'ResultsController'
		})
		.when('/:id', {
			templateUrl: 'views/result.html',
			controller: 'ItemController'

		})
		.when('/:id/postings/:itemId', {
			templateUrl: 'views/oneResult.html',
			controller: 'SinItemController'

		})
		.when('/user', {
			templateUrl: 'views/login.html',
			controller: 'UserController'
		})
		.when('/login', {
			templateUrl: 'views/login.html',
			controller: 'ResultsController'
		})

		.otherwise({redirectTo: '/'});
	})

}());
