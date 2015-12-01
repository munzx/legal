'use strict';

angular.module('adminModule').controller('caseTypeAdminController', ['$scope', '$modal', 'connectCaseTypeFactory', function ($scope, $modal, connectCaseTypeFactory) {
	connectCaseTypeFactory.query({}, function(response){
		$scope.caseTypes = response;
	}, function(error){
		$scope.error = error.data.message;
	});

	$scope.showNewCaseTypeForm = function () {
		$modal.open({
			templateUrl: 'public/modules/casetypes/view/create.casetype.view.html',
			controller: 'indexCaseTypeController',
			size: 'md',
			backdrop : 'static',
			resolve: {
				caseTypes: function(){
					return $scope.caseTypes;
				}
			}
		});
	}

	$scope.removeCaseType = function(index, id){
		connectCaseTypeFactory.delete({'id': id}, function(response){
			$scope.caseTypes[index] = response;
		}, function(error){
			$scope.error = error.data.message;
		});
	}

}]);