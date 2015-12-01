'use strict';

angular.module('uploadModule').controller('indexUploadController', ['$scope', '$modalInstance', 'selectedCase', '$modal', '$http', 'connectCaseFactory', function ($scope, $modalInstance, selectedCase, $modal, $http, connectCaseFactory) {
	$scope.selectedCase = selectedCase;

	$scope.closeModal = function(){
		$modalInstance.dismiss('cancel');
	}

	$scope.allDocs = function(){
		$http.get('/api/v1/case/' + $scope.selectedCase._id + '/docs')
		.success(function(data, success){
			$scope.docs = data;
		})
		.error(function(data, error){
			$scope.error = error.data;
		});	
	}

	//init get all docs
	$scope.allDocs();

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
		var modalInstance = $modal.open({
			templateUrl: 'public/modules/config/view/message/confirm.message.config.view.html',
			backdrop: 'static',
			controller: ['$scope', '$modalInstance', 'doc', 'selectedCase', 'allDocs', function($scope, $modalInstance, doc, selectedCase, allDocs){
				$scope.message = {};
				$scope.message.title = 'حذف المستند';
				$scope.message.text = ' هل ترغب بحذف المستند ' + doc.name  + ' ?';
				$scope.message.confirm = 'نعم';
				$scope.message.cancel = 'لا';

				$scope.confirm = function(){
					connectCaseFactory.delete({'caseId': selectedCase._id, 'action': 'upload', 'actionId': id}, function(response){
						allDocs();
						$modalInstance.dismiss('cancel');
					}, function (error) {
						$scope.error = error
					});
				}

				$scope.cancel = function(){
					$modalInstance.dismiss('cancel');
				}

				$scope.closeModal = function(){
					$modalInstance.dismiss('cancel');
				}
			}],
			resolve: {
				doc: function(){
					return $scope.docs[index];
				},
				allDocs: function () {
					return $scope.allDocs;
				},
				selectedCase: function(){
					return $scope.selectedCase;
				}
			}
		});
	}

}]);