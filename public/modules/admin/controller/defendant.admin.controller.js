'use strict';

angular.module('adminModule').controller('defendantAdminController', ['$scope', 'connectDefendantFactory', '$http', '$modal', function ($scope, connectDefendantFactory, $http, $modal) {
	connectDefendantFactory.query({}, function(response){
		$scope.defendants = response;
	}, function(error){
		$scope.error = error.data.message;
	});

	$scope.removeDefendant = function(index, id){
		var modalInstance = $modal.open({
			templateUrl: 'public/modules/config/view/message/confirm.message.config.view.html',
			backdrop: 'static',
			controller: ['$scope', '$modalInstance', 'id', 'defendants', 'index', function($scope, $modalInstance, id, defendants, index){
				$scope.message = {};
				$scope.message.title = 'حذف خصم';
				$scope.message.text = ' هل ترغب بحذف الخصم ' + defendants[index].firstName  + ' ' + defendants[index].lastName  + ' ?';
				$scope.message.confirm = 'نعم';
				$scope.message.cancel = 'لا';

				$scope.confirm = function(){
					connectDefendantFactory.delete({'id': id}, function(response){
						defendants[index] = response;
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
				defendants: function () {
					return $scope.defendants;
				},
				index: function(){
					return index;
				}
			}
		});
	}

}]);