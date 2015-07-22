'use strict';

angular.module('clientModule').controller('indexClientController', ['$scope', '$modalInstance', 'connectUserFactory', 'clients', function ($scope, $modalInstance, connectUserFactory, clients) {
	//init the client info
	$scope.userInfo = {};
	$scope.userInfo.role = 'client';

	$scope.createNewClient = function(){
		$scope.error = false;
		connectUserFactory.save({}, {'userInfo': $scope.userInfo}, function(response){
			clients.push(response);
			$modalInstance.dismiss('cancel');
		}, function(error){
			$scope.error = error.data.message;
			console.log(error);
		});
	}

	$scope.closeModal = function(){
		$modalInstance.dismiss('cancel');
	}
}]);