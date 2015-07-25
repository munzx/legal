'use strict';

angular.module('caseModule').controller('detailsCaseController', ['$scope', 'connectCaseFactory', 'selectedCase', '$modalInstance', '$modal', function ($scope, connectCaseFactory, selectedCase, $modalInstance, $modal) {
	$scope.selectedCase = selectedCase;

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