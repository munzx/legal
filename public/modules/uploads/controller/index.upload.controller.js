'use strict';

angular.module('uploadModule').controller('indexUploadController', ['$scope', '$modalInstance', 'selectedCase', '$modal', '$http', 'connectCaseFactory', function ($scope, $modalInstance, selectedCase, $modal, $http, connectCaseFactory) {
	$scope.selectedCase = selectedCase;

	$scope.closeModal = function(){
		$modalInstance.dismiss('cancel');
	}

	$http.get('/api/v1/case/' + $scope.selectedCase._id + '/docs')
	.success(function(data, success){
		$scope.docs = data;
	})
	.error(function(data, error){
		$scope.error = error.data;
	});

	$scope.addDoc = function(){
		$modal.open({
			controller: 'addUploadController',
			templateUrl: 'public/modules/uploads/view/add.upload.view.html',
			backdrop: 'static',
			resolve: {
				selectedCase: function(){
					return $scope.selectedCase;
				},
				docs: function () {
					return $scope.docs;
				}
			}
		});
	}

	$scope.downloadDoc = function(docId){
		return '/api/v1/case/' + $scope.selectedCase._id +'/download/' + docId;
	}

	$scope.removeDoc = function (index, id) {
		connectCaseFactory.delete({'caseId': selectedCase._id, 'action': 'upload', 'actionId': id}, function(response){
			$scope.docs = response.docs;
		});
	}

}]);