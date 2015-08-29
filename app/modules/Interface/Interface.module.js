var InterfaceController = require('./Interface.controller')



var Interface = angular.module('Interface', [])

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

.controller('InterfaceController', ['$rootScope', '$timeout', '$window', InterfaceController])