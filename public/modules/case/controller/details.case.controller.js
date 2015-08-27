'use strict';

angular.module('caseModule').controller('detailsCaseController', ['$scope', 'connectCaseFactory', 'selectedCase', '$modalInstance', '$modal', function ($scope, connectCaseFactory, selectedCase, $modalInstance, $modal) {
	$scope.selectedCase = selectedCase;

	$scope.closeModal = function(){
		$modalInstance.dismiss('cancel');
	}

	$scope.nextSessionDate = function(){
		if($scope.selectedCase.sessions){
			return ($scope.selectedCase.sessions.length)? $scope.selectedCase.sessions[selectedCase.sessions.length - 1].newDate: '';
		}
		return '';
	}

	$scope.nextSessionTime = function(){
		if($scope.selectedCase.sessions){
			return ($scope.selectedCase.sessions.length)? $scope.selectedCase.sessions[selectedCase.sessions.length - 1].newTime: '';
		}
		return '';
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
						selectedCase.client[index].removed = true;
						$modalInstance.dismiss('cancel');
					}, function(error){
						console.log(error);
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
				$scope.message.text = ' هل ترغب بحذف الموكل ' + defendant.user.firstName + ' ' + ' ' + defendant.user.lastName + ' ?';
				$scope.message.confirm = 'نعم';
				$scope.message.cancel = 'لا';

				$scope.confirm = function(){
					connectCaseFactory.remove({'caseId': selectedCase._id, 'action': 'defendant', 'id': defendant._id}, function(response){
						$modalInstance.dismiss('cancel');
						selectedCase.defendant[index].removed = true;
					}, function(error){
						console.log(error);
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


}]);