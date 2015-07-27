'use strict';

angular.module('caseModule').factory('connectCaseFactory', ['$resource', function ($resource) {
	return $resource('api/v1/case/:action/:subaction/:id');
}])