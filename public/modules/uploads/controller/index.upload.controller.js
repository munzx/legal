'use strict';

angular.module('uploadModule').controller('indexUploadController', ['$scope', '$modalInstance', 'selectedCase', '$modal', '$http', function ($scope, $modalInstance, selectedCase, $modal, $http) {
	$scope.selectedCase = selectedCase;

	$scope.closeModal = function(){
		$modalInstance.dismiss('cancel');
	}


	$http.get('/api/v1/case/' + $scope.selectedCase._id + '/docs')
	.success(function(data, success){
		console.log(data);
		$scope.docs = data;
	})
	.error(function(data, error){
		$scope.error = error.data;
	});


	
	console.log($scope.docs);

	$scope.addDoc = function(){
		$modal.open({
			controller: 'addUploadController',
			templateUrl: 'public/modules/uploads/view/add.upload.view.html',
			backdrop: 'static',
			resolve: {
				selectedCase: function(){
					return $scope.selectedCase;
				}
			}
		});
	}

	$scope.downloadDoc = function(docId){
		return '/api/v1/case/' + $scope.selectedCase._id +'/download/' + docId;
	}

	
}]);