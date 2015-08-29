(function(){
	String.prototype.trim = function() {
	    return this.replace(/^\s+|\s+$/g,"");
	}
	String.prototype.trimLeft = function() {
	    return this.replace(/^\s+/,"");
	}
	String.prototype.trimRight = function() {
	    return this.replace(/\s+$/,"");
	}


	'use strict';
	require('angular');
	require('angular-route');
	require('angular-ui-router');
	require('moment');
	require('angular-moment');
	
	
	var InterfaceController = require('../modules/Interface/Interface.controller')



	var app = angular.module('App', [
		'ui.router'
	])
	.run(['$rootScope', '$state', function($rootScope, $state){
		$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
			if(toState.name=='Redirect'){
				event.preventDefault();
				$state.go('Interface');
				return false;
			}
		});
	}])
	.config(['$httpProvider', '$stateProvider', '$urlRouterProvider', function Config($httpProvider, $stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('Redirect', { url:'' })
		;
		$urlRouterProvider.otherwise('/interface');
	}])

	

	.config(['$stateProvider', function ($stateProvider) {
		$stateProvider
			.state('Interface', {
				url:'/interface',
				views:{
					'main-view':{
						controller: 'InterfaceController as InterfaceCtrl',
						templateUrl: 'modules/Interface/Interface.tmpl.html'
					}
				}
			})
		;
	}])

	.controller('InterfaceController', ['$rootScope', '$timeout', '$window', '$http', InterfaceController])







})();