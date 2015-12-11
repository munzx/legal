'use strict';

angular.module('uploadModule').controller('addUploadController', ['$scope', '$modalInstance', 'selectedCase', '$http', 'docs', '$modal', function ($scope, $modalInstance, selectedCase, $http, docs, $modal) {
	$scope.selectedCase = selectedCase;

	$scope.closeModal = function(){
		$modalInstance.dismiss('cancel');
	}

	$scope.add = function(){
		$modal.open({
			template: '<h1 class="text-center"><img src="public/modules/config/img/loading.gif" /></h1>',
			backdrop: 'static',
			controller: ['$scope', 'docInfo', 'error', 'selectedCase', '$modalInstance', 'parentModalInstance', function ($scope, docInfo, error, selectedCase, $modalInstance, parentModalInstance) {
				var formData = new FormData();
				var doc = document.getElementById('doc').files[0];
				formData.append('name', docInfo.name);
				formData.append('description', docInfo.description);
				formData.append('doc', doc);

				$http.post('/api/v1/case/' + selectedCase._id + '/upload', formData, {
					transformRequest: angular.identity,
					headers: {'Content-Type': undefined}
				}).success(function(data, success){
					$modalInstance.dismiss('cancel');
					parentModalInstance.dismiss('cancel');
				})
				.error(function(data, error){
					error = data;
					$modalInstance.dismiss('cancel');
					parentModalInstance.dismiss('cancel');
				});
			}],
			resolve: {
				docInfo: function () {
					return $scope.docInfo;
				},
				error: function () {
					return $scope.error;
				},
				selectedCase: function () {
					return $scope.selectedCase;
				},
				parentModalInstance: function () {
					return $modalInstance;
				}
			}
		});
	}
}]);