var ng = angular
;(function(){
	'use strict';

	ang.module('myAddressBook', ["ngRoute","mgcrea.ngStrap"])

	.config(function($routeProvider){
		$routeProvider
		.when('/', {
			templateUrl: 'views/main.html',
			controller: 'AddressController',
			controllerAs: 'addressctrl'
		})
		.when('/new', {
			templateUrl: 'views/newContact.html',
			controller: 'AddressController',
			controllerAs: 'addressctrl'
		})
		.when('/:id', {
			templateUrl: 'views/cardContact.html',
			controller: 'ShowController',
			controllerAs: 'show'
		})
		.when('/:id/edit', {
			templateUrl: 'views/newContact.html',
			controller: 'EditController',
			controllerAs: 'addressctrl'
		})
		.otherwise({redirectTo: '/'});
	})
}());
