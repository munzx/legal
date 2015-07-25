'use strict';

angular.module('updateTypesModule').controller('indexUpdateTypesController', ['$scope', 'connectUpdateTypeFactory', 'updatetypes', '$modalInstance', function($scope, connectUpdateTypeFactory, updatetypes, $modalInstance){
	$scope.closeModal = function(){
		$modalInstance.dismiss('cancel');
	}

	$scope.createUpdateType = function(){
		connectUpdateTypeFactory.save({}, {'updatetypesInfo': $scope.updateType}, function(response){
			updatetypes.push(response);
			$modalInstance.dismiss('cancel');
		}, function(error){
			$scope.error = error.data.message;
		});
	}

}]);