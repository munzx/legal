'use strict';


angular.module('caseModule').controller('uploadMemoConsultantCaseController', ['$modalInstance', '$scope', 'memoInfo', '$http', function ($modalInstance, $scope, memoInfo, $http) {
	$scope.memoInfo = memoInfo;
	$scope.closeModal = function () {
		$modalInstance.dismiss('cancel');
	}

	$scope.uploadMemo = function () {
		var formData = new FormData();
		var doc = document.getElementById('doc').files[0];
		formData.append('doc', doc);

		$http.post('/api/v1/case/' + $scope.memoInfo.caseId + '/upload/'+ $scope.memoInfo.updateId, formData, {
			transformRequest: angular.identity,
			headers: {'Content-Type': undefined}
		}).success(function(data, success){
			$modalInstance.dismiss('cancel');
		})
		.error(function(data, error){
			$modalInstance.dismiss('cancel');
		});
	}
}]);