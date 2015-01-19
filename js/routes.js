var ng = angular
;(function(){
	'use strict';

	ng.module('CListApp', ["ngRoute","mgcrea.ngStrap"])

	.config(function($routeProvider){
		$routeProvider
		.when('/', {
			templateUrl: 'index.html',
			controller: 'SearchController'
		})
		.when('/:id', {
			templateUrl: 'views/results.html',
			controller: 'ResultsController',
		})

		.otherwise({redirectTo: '/'});
	})
}());
