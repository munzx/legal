'use strict';

angular.module('adminModule').controller('caseRoleAdminController', ['$scope', 'connectCaseRoleFactory', '$modal', function ($scope, connectCaseRoleFactory, $modal) {
	connectCaseRoleFactory.query({}, function(response){
		$scope.caseRoles = response;
	}, function(error){
		$scope.error = error.data.message;
	});

	$scope.showNewCaseRoleForm = function(){
		$modal.open({
			templateUrl: 'public/modules/caserole/view/create.caserole.view.html',
			controller: 'indexCaseRoleController',
			backdrop : 'static',
			resolve: {
				caseRoles: function(){
					return $scope.caseRoles;
				}
			}
		});
	}

	$scope.removeCaseRole = function(index, id){
		connectCaseRoleFactory.delete({'id': id}, function(response){
			$scope.caseRoles.splice(index, 1);
		}, function(error){
			$scope.error = error.data.message;
		});
	}

}]);