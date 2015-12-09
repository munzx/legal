'use strict';

angular.module('yousufalsharif').factory('socketConfigFactory', ['socketFactory', function (socketFactory) {
	return socketFactory();
}]);