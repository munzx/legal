'use strict';

angular.module('adminModule').controller('caseTypeAdminController', ['$scope', '$modal', 'connectCaseTypeFactory', function ($scope, $modal, connectCaseTypeFactory) {
	connectCaseTypeFactory.query({}, function(response){
		$scope.caseTypes = response;
	}, function(error){
		$scope.error = error.data.message;
	});

	$scope.showNewCaseTypeForm = function () {
		$modal.open({
			templateUrl: 'public/modules/casetypes/view/create.casetype.view.html',
			controller: 'indexCaseTypeController',
			size: 'md',
			backdrop : 'static',
			resolve: {
				caseTypes: function(){
					return $scope.caseTypes;
				}
			}
		});
	}

	$scope.removeCaseType = function(index, id){
		var modalInstance = $modal.open({
			templateUrl: 'public/modules/config/view/message/confirm.message.config.view.html',
			backdrop: 'static',
			controller: ['$scope', '$modalInstance', 'id', 'caseTypes', 'index', function($scope, $modalInstance, id, caseTypes, index){
				$scope.message = {};
				$scope.message.title = 'حذف نوع قضية';
				$scope.message.text = ' هل ترغب بحذف نوع القضية ' + caseTypes[index].name  + ' ?';
				$scope.message.confirm = 'نعم';
				$scope.message.cancel = 'لا';

				$scope.confirm = function(){
					connectCaseTypeFactory.delete({'id': id}, function(response){
						caseTypes[index] = response;
						$modalInstance.dismiss('cancel');
					}, function(error){
						$scope.error = error.data.message;
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
				id: function(){
					return id;
				},
				caseTypes: function () {
					return $scope.caseTypes;
				},
				index: function(){
					return index;
				}
			}
		});
	}

}]);