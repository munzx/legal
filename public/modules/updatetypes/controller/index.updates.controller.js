'use strict';

angular.module('updateTypesModule').controller('indexUpdateTypesController', ['$scope', 'connectUpdateTypeFactory', 'updatetypes', '$modalInstance', function($scope, connectUpdateTypeFactory, updatetypes, $modalInstance){
	$scope.closeModal = function(){
		$modalInstance.dismiss('cancel');
	}

	$scope.updateType = {};

	$scope.falseOnMemoRequest = function () {
		if($scope.updateType.requestMemo){
			$scope.updateType.requireDeadline = true;
			return true;
		}
	}

	$scope.createUpdateType = function(){
		connectUpdateTypeFactory.save({}, {'updatetypesInfo': $scope.updateType}, function(response){
			$modalInstance.dismiss('cancel');
		}, function(error){
			$scope.error = error.data.message;
		});
	}

}]);