'use strict';

angular.module('caseModule').controller('detailsCaseController', ['$scope', 'connectCaseFactory', 'selectedCase', '$modalInstance', '$modal', 'user', 'socketConfigFactory', function ($scope, connectCaseFactory, selectedCase, $modalInstance, $modal, user, socketConfigFactory) {
	$scope.selectedCase = selectedCase;
	$scope.user = user;

	//listen to update
	socketConfigFactory.on('cases.update', function (caseInfo) {
		$scope.selectedCase = caseInfo;
	});

	$scope.closeModal = function(){
		$modalInstance.dismiss('cancel');
	}

	$scope.showNextSession = function(){
		if($scope.selectedCase.sessions){
			return true;
		}
		return false;
	}

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

	$scope.showAddClientSwitch = function(){
		$modal.open({
			templateUrl: 'public/modules/client/view/switch.client.view.html',
			controller: 'switchClientController',
			backdrop: 'static',
			resolve: {
				selectedCase: function(){
					return $scope.selectedCase;
				}
			}
		});
	}

	$scope.showAddDefendantSwitch = function(){
		$modal.open({
			templateUrl: 'public/modules/defendant/view/switch.defendant.view.html',
			controller: 'switchDefendantController',
			backdrop: 'static',
			resolve: {
				selectedCase: function(){
					return $scope.selectedCase;
				}
			}
		});
	}

	$scope.showRemoveClientConfirmForm = function(index){
		var modalInstance = $modal.open({
			templateUrl: 'public/modules/config/view/message/confirm.message.config.view.html',
			backdrop: 'static',
			controller: ['$scope', '$modalInstance', 'client', 'selectedCase', function($scope, $modalInstance, client, selectedCase){
				$scope.message = {};
				$scope.message.title = 'حذف موكل';
				$scope.message.text = ' هل ترغب بحذف الموكل ' + client.user.firstName + ' ' + ' ' + client.user.lastName + ' ?';
				$scope.message.confirm = 'نعم';
				$scope.message.cancel = 'لا';

				$scope.confirm = function(){
					connectCaseFactory.remove({'caseId': selectedCase._id, 'action': 'client', 'id': client._id}, function(response){
						$modalInstance.dismiss('cancel');
					}, function(error){
						$scope.error = error;
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
				client: function(){
					return $scope.selectedCase.client[index];
				},
				selectedCase: function(){
					return $scope.selectedCase;
				}
			}
		});
	}

	$scope.showRemoveDefendantConfirmForm = function(index){
		var modalInstance = $modal.open({
			templateUrl: 'public/modules/config/view/message/confirm.message.config.view.html',
			backdrop: 'static',
			controller: ['$scope', '$modalInstance', 'defendant', 'selectedCase', function($scope, $modalInstance, defendant, selectedCase){
				$scope.message = {};
				$scope.message.title = 'حذف موكل';
				$scope.message.text = ' هل ترغب بحذف الخصم ' + defendant.user.firstName + ' ' + ' ' + defendant.user.lastName + ' ?';
				$scope.message.confirm = 'نعم';
				$scope.message.cancel = 'لا';

				$scope.confirm = function(){
					connectCaseFactory.remove({'caseId': selectedCase._id, 'action': 'defendant', 'id': defendant._id}, function(response){
						$modalInstance.dismiss('cancel');
					}, function(error){
						$scope.error = error;
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
				defendant: function(){
					return $scope.selectedCase.defendant[index];
				},
				selectedCase: function(){
					return $scope.selectedCase;
				}
			}
		});
	}

	$scope.showUploads = function(){
		$modal.open({
			controller: 'indexUploadController',
			templateUrl: 'public/modules/uploads/view/index.upload.view.html',
			backdrop: 'static',
			size: 'md',
			resolve: {
				selectedCase: function(){
					return $scope.selectedCase;
				}
			}
		});
	}

	$scope.softRemoveUpdate = function (index) {
		if(!index && index !== 0){ return; };
		var modalInstance = $modal.open({
			templateUrl: 'public/modules/config/view/message/confirm.message.config.view.html',
			backdrop: 'static',
			controller: ['$scope', '$modalInstance','selectedCase', '$filter', function($scope, $modalInstance, selectedCase, $filter){
				var updateDate = $filter('date')(selectedCase.updates[index].created, "dd/MM/yyyy");
				var updateIdNumber = (selectedCase.updates[index].updateId)? ' رقم ' + selectedCase.updates[index].updateId + ' ': '';
				$scope.message = {};
				$scope.message.title = 'حذف تحديث';
				$scope.message.text = 'هل ترغب بحذف : ' + selectedCase.updates[index].updateType + updateIdNumber + ' بتاريخ ' +  updateDate + ' ?';
				$scope.message.confirm = 'نعم';
				$scope.message.cancel = 'لا';

				$scope.confirm = function(){
					var updateInfo = selectedCase.updates[index];
					connectCaseFactory.remove({'action': 'caseupdate', 'actionId': selectedCase._id, 'id': updateInfo._id}, function(response){
						$modalInstance.dismiss('cancel');
					}, function(error){
						$scope.error = error;
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
				selectedCase: function(){
					return $scope.selectedCase;
				}
			}
		});
	}
}]);