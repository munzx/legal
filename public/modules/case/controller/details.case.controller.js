'use strict';

angular.module('caseModule').controller('detailsCaseController', ['$scope', 'connectCaseFactory', 'selectedCase', '$modalInstance', '$modal', function ($scope, connectCaseFactory, selectedCase, $modalInstance, $modal) {
	$scope.selectedCase = selectedCase;

	$scope.nextSessionDate = function(){
		if($scope.selectedCase.sessions){
			return ($scope.selectedCase.sessions.length)? $scope.selectedCase.sessions[selectedCase.sessions.length - 1].newDate: '';
		}
		return '';
	}
	$scope.nextSessionTime = function(){
		if($scope.selectedCase.sessions){
			return ($scope.selectedCase.sessions.length)? $scope.selectedCase.sessions[selectedCase.sessions.length - 1].newTime: '';
		}
		return '';
	}

	$scope.showUpdateCase = function(){
		$modal.open({
			templateUrl: 'public/modules/case/view/update.case.view.html',
			controller: 'updateCaseController',
			backdrop: 'static',
			size: 'md',
			resolve: {
				selectedCase: function(){
					return selectedCase;
				}
			}
		});
	}

	$scope.closeModal = function(){
		$modalInstance.dismiss('cancel');
	}
}]);