'use strict';

angular.module('defendantModule').factory('connectDefendantFactory', ['$resource', function ($resource) {
	return $resource('api/v1/defendant/:id/:action');
}]);