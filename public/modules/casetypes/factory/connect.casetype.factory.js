'use strict';

angular.module('caseTypeModule').factory('connectCaseTypeFactory', ['$resource', function ($resource) {
	return $resource('api/v1/casetype/:id/:action');
}]);