'use strict';

angular.module('uploadModule').controller('addUploadController', ['$scope', '$modalInstance', 'selectedCase', '$http', function ($scope, $modalInstance, selectedCase, $http) {
	$scope.selectedCase = selectedCase;

	$scope.closeModal = function(){
		$modalInstance.dismiss('cancel');
	}

	$scope.add = function(){
		var formData = new FormData();
		var doc = document.getElementById('doc').files[0];
		formData.append('name', $scope.docInfo.name);
		formData.append('description', $scope.docInfo.description);
		formData.append('doc', doc);

		$http.post('/api/v1/case/' + $scope.selectedCase._id + '/upload', formData, {
			transformRequest: angular.identity,
			headers: {'Content-Type': undefined}
		}).success(function(data, success){
			$scope.selectedCase.docs.push(data);
			console.log(data);
			$modalInstance.dismiss('cancel');
		})
		.error(function(data, error){
			$scope.error = data.message;
			console.log(data);
		});
	}
}]);