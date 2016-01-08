'user strict';

angular.module('legality').factory('connectContactHomeFactory', ['$resource', function ($resource) {
	return $resource('/api/v1/cms/contact');
}]);