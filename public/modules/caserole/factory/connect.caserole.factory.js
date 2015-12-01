'use strict';

angular.module('caseRoleModule').factory('connectCaseRoleFactory', ['$resource', function ($resource) {
	return $resource('api/v1/caserole/:id/:action');
}]);