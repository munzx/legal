'use strict';

angular.module('caseModule').factory('connectCaseFactory', ['$resource', function ($resource) {
	return $resource('api/v1/case/:caseId/:action/:actionId/:subaction/:id');
}])