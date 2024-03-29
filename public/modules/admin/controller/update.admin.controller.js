'use strict';

angular.module('adminModule').controller('updateTypesAdminController', ['$scope', '$modal', 'connectUpdateTypeFactory', 'socketConfigFactory', function ($scope, $modal, connectUpdateTypeFactory, socketConfigFactory) {
	var getUpdateType = function () {
		connectUpdateTypeFactory.query({}, function(response){
			$scope.updatetypes = response;
		}, function(error){
			$scope.error = error.data.message;
		});	
	}

	//init getUpdateType
	getUpdateType();

	//listen to update
	socketConfigFactory.on('updateType.update.add', function (response) {
		$scope.updatetypes.push(response);
	});

	//listen to update
	socketConfigFactory.on('updateType.update.update', function (response) {
		getUpdateType();
	});

	$scope.showNewUpdateForm = function(){
		$modal.open({
			templateUrl: 'public/modules/updatetypes/view/create.update.types.view.html',
			controller: 'indexUpdateTypesController',
			size: 'sm',
			backdrop: 'static',
			resolve: {
				updatetypes: function(){
					return $scope.updatetypes;
				}
			}
		});
	}

	$scope.removeUpdatetypes = function(index, id){
		var modalInstance = $modal.open({
			templateUrl: 'public/modules/config/view/message/confirm.message.config.view.html',
			backdrop: 'static',
			controller: ['$scope', '$modalInstance', 'id', 'updatetypes', 'index', function($scope, $modalInstance, id, updatetypes, index){
				$scope.message = {};
				$scope.message.title = 'حذف نوع تحديث';
				$scope.message.text = ' هل ترغب بحذف نوع التحديث ' + updatetypes[index].name  + ' ?';
				$scope.message.confirm = 'نعم';
				$scope.message.cancel = 'لا';

				$scope.confirm = function(){
					connectUpdateTypeFactory.delete({'id': id}, function(response){
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
				updatetypes: function () {
					return $scope.updatetypes;
				},
				index: function(){
					return index;
				}
			}
		});
	}

}]);