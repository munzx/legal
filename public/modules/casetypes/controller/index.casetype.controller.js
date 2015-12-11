'use strict';

angular.module('caseTypeModule').controller('indexCaseTypeController', ['$scope', '$modalInstance', 'connectCaseTypeFactory', 'caseTypes', function ($scope, $modalInstance, connectCaseTypeFactory, caseTypes) {
	$scope.closeModal = function(){
		$modalInstance.dismiss('cancel');
	}

	$scope.createNewCaseType = function(){
		connectCaseTypeFactory.save({}, {'caseTypeInfo': $scope.newCaseType}, function(response){
			$modalInstance.dismiss('cancel');
		}, function(error){
			$scope.error = error.data.message;
		});
	}

}]);