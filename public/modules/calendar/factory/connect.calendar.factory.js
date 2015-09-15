'use strict';

angular.module('calendarModule').factory('connectCalendarFactory', ['$resource', function ($resource) {
	return $resource('/api/v1/calendar/:action/:id/:subaction');
}]);