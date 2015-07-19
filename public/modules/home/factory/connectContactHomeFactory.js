'user strict';

angular.module('yousufalsharif').factory('connectContactHomeFactory', ['$resource', function ($resource) {
	return $resource('/api/v1/cms/contact');
}]);