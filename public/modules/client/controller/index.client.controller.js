'use strict';

angular.module('clientModule').controller('indexClientController', ['$scope', '$modalInstance', 'connectUserFactory', 'clients', 'selectedClients', function ($scope, $modalInstance, connectUserFactory, clients, selectedClients) {
	//init the client info
	$scope.userInfo = {};
	$scope.userInfo.role = 'client';

	$scope.createNewClient = function(){
		$scope.error = false;
		connectUserFactory.save({}, {'userInfo': $scope.userInfo}, function(response){
			selectedClients.push(response);
			$modalInstance.dismiss('cancel');
		}, function(error){
			$scope.error = error.data.message;
		});
	}

	$scope.closeModal = function(){
		$modalInstance.dismiss('cancel');
	}
}]);