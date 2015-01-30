var ng = angular
;(function(){
	'use strict';

	ng.module('CListApp')

	.config(function($routeProvider, $locationProvider){
		$routeProvider
		.when('/', {
			templateUrl: 'views/main.html',
			controller: 'MainController'
		})
		.when('/:id', {
			templateUrl: 'views/result.html',
			controller: 'ItemController'

		})
		.when('/:id/postings/:itemId', {
			templateUrl: 'views/oneResult.html',
			controller: 'ItemController'

		})
		.when('/login', {
			templateUrl: 'views/login.html',
			controller: 'LoginController',
			controllerAs: 'login'
		})

		.otherwise({redirectTo: '/'});
	})

}());
