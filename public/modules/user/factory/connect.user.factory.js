'use strict';

angular.module('userModule').factory('connectUserFactory', ['$resource', function ($resource) {
	return $resource('/api/v1/user/:action/:byUserName/:id',
		{
			name: "@byUserName",
			action: "@action",
			id: "@id"
		},
		{
			"update": {
				method:"PUT"
			}
		});
}]);