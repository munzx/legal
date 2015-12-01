'use strict';

angular.module('adminModule').controller('caseRoleAdminController', ['$scope', 'connectCaseRoleFactory', '$modal', function ($scope, connectCaseRoleFactory, $modal) {
	connectCaseRoleFactory.query({}, function(response){
		$scope.caseRoles = response;
	}, function(error){
		$scope.error = error.data.message;
	});

	$scope.showNewCaseRoleForm = function(){
		$modal.open({
			templateUrl: 'public/modules/caserole/view/create.caserole.view.html',
			controller: 'indexCaseRoleController',
			backdrop : 'static',
			resolve: {
				caseRoles: function(){
					return $scope.caseRoles;
				}
			}
		});
	}

	$scope.removeCaseRole = function(index, id){
		var modalInstance = $modal.open({
			templateUrl: 'public/modules/config/view/message/confirm.message.config.view.html',
			backdrop: 'static',
			controller: ['$scope', '$modalInstance', 'id', 'caseRoles', 'index', function($scope, $modalInstance, id, caseRoles, index){
				$scope.message = {};
				$scope.message.title = 'حذف صفة';
				$scope.message.text = ' هل ترغب بحذف الصفة ' + caseRoles[index].name  + ' ?';
				$scope.message.confirm = 'نعم';
				$scope.message.cancel = 'لا';

				$scope.confirm = function(){
					connectCaseRoleFactory.delete({'id': id}, function(response){
						caseRoles[index] = response;
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
				caseRoles: function () {
					return $scope.caseRoles;
				},
				index: function(){
					return index;
				}
			}
		});



	}

}]);
