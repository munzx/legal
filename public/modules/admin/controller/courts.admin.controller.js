'use strict';

angular.module('adminModule').controller('courtsAdminController', ['$scope', 'connectAdminFactory', '$state', '$modal', 'socketConfigFactory', function ($scope, connectAdminFactory, $state, $modal, socketConfigFactory) {
	var getCourts = function () {
		connectAdminFactory.query({page: 'court'}, function(response){
			$scope.courts = response;
		});
	}

	//init getCourts
	getCourts();


	//listen to court add
	socketConfigFactory.on('court.add', function (response) {
		$scope.courts.push(response);
	});

	//listen to court add
	socketConfigFactory.on('court.update', function (response) {
		getCourts();
	});

	$scope.showNewCourtForm = function(){
		$modal.open({
			templateUrl: 'public/modules/court/view/create.court.view.html',
			controller: 'indexCourtController',
			size: 'md',
			backdrop : 'static',
			resolve: {
				courts: function(){
					return $scope.courts;
				}
			}
		});
	}

	$scope.removeCourtInfo = function(index, id){
		var modalInstance = $modal.open({
			templateUrl: 'public/modules/config/view/message/confirm.message.config.view.html',
			backdrop: 'static',
			controller: ['$scope', '$modalInstance', 'id', 'courts', 'index', function($scope, $modalInstance, id, courts, index){
				$scope.message = {};
				$scope.message.title = 'حذف محكمة';
				$scope.message.text = ' هل ترغب بحذف ' + courts[index].name  + ' ?';
				$scope.message.confirm = 'نعم';
				$scope.message.cancel = 'لا';

				$scope.confirm = function(){
					connectAdminFactory.delete({page: 'court', param: id}, function(response){
						$modalInstance.dismiss('cancel');
					}, function(error){
						$scope.error = response.data.message;
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
				courts: function () {
					return $scope.courts;
				},
				index: function(){
					return index;
				}
			}
		});
	}

}]);