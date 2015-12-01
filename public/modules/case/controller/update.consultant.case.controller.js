'use strict';

angular.module('caseModule').controller('updateConsultantCaseController', ['$scope', '$modalInstance', 'connectAdminFactory', 'memoInfo', 'connectCaseFactory', function ($scope, $modalInstance, connectAdminFactory, memoInfo, connectCaseFactory) {
	$scope.memoInfo = memoInfo;

	connectAdminFactory.query({'page': 'consultant', 'action': 'available'}, function (response) {
		$scope.consultants = response;
	});

	$scope.closeModal = function(){
		$modalInstance.dismiss('cancel');
	}

	$scope.updateConsultant = function(){
		if($scope.memoInfo.caseId &&  $scope.memoInfo.updateId && $scope.consultantIndex){
			//get the selected consultant
			var update = {
				'caseId': $scope.memoInfo.caseId,
				'memoId': $scope.memoInfo.updateId,
				'memoConsultantId': $scope.consultants[$scope.consultantIndex]._id
			}

			connectCaseFactory.save({'action': 'memos', 'subaction': 'insertconsultant'}, {'update': update}, function(response){
				$modalInstance.dismiss('cancel');
				$scope.memoInfo.memoConsultant.push($scope.consultants[$scope.consultantIndex]);
			}, function(error){
				$scope.error = error.data.message;
			});
		}
	}


}]);