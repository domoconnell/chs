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
	
	



	var app = angular.module('App', [
		'ui.router'
	])
})();