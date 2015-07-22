'use strict';

angular.module('adminModule').controller('courtsAdminController', ['$scope', 'connectAdminFactory', '$state', '$modal',function ($scope, connectAdminFactory, $state, $modal) {
	connectAdminFactory.query({page: 'court'}, function(response){
		$scope.courts = response;
	});

	$scope.showNewCourtForm = function(){
		$modal.open({
			templateUrl: 'public/modules/court/view/create.court.view.html',
			controller: 'indexCourtController',
			size: 'md',
			resolve: {
				courts: function(){
					return $scope.courts;
				}
			}
		});
	}

	$scope.removeCourtInfo = function(index, id){
		connectAdminFactory.delete({page: 'court', param: id}, function(response){
			$scope.error = false;
			$scope.courts.splice(index, 1);
		}, function(error){
			$scope.error = response.data.message;
		});
	}

}]);