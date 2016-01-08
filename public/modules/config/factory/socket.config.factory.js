'use strict';

angular.module('legality').factory('socketConfigFactory', ['socketFactory', function (socketFactory) {
	return socketFactory();
}]);