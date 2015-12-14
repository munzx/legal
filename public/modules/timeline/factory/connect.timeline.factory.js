'use strict';

angular.module('timelineModule').factory('connectTimelineFactory', ['$resource', function ($resource) {
	return $resource('api/v1/timeline');
}]);