'use strict';

angular.module('updateTypesModule').factory('connectUpdateTypeFactory', ['$resource', function ($resource) {
	return $resource('api/v1/updatetype/:id/:action');
}])