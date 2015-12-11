'use strict';

angular.module('courtModule').controller('indexCourtController', ['$scope', '$modalInstance', 'connectAdminFactory', 'courts', function ($scope, $modalInstance, connectAdminFactory, courts) {
	//init
	$scope.courtInfo = {};
	//default value
	$scope.courtInfo.city = 'دبي';

	$scope.createCourte = function(){
		connectAdminFactory.save({page: 'court'}, {'courtInfo': $scope.courtInfo}, function(response){
			$scope.error = false;
			$modalInstance.dismiss('cancel');
		}, function(response){
			$scope.error = response.data.message;
		});
	}

	$scope.closeModal = function(){
		$modalInstance.dismiss('cancel');
	}

}]);