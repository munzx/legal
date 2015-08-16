'use strict';

angular.module('adminModule').controller('updateTypesAdminController', ['$scope', '$modal', 'connectUpdateTypeFactory', function ($scope, $modal, connectUpdateTypeFactory) {
	connectUpdateTypeFactory.query({}, function(response){
		$scope.updatetypes = response;
		console.log($scope.updatetypes);
	}, function(error){
		$scope.error = error.data.message;
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
		connectUpdateTypeFactory.delete({'id': id}, function(response){
			$scope.updatetypes.splice(index, 1);
		}, function(error){
			$scope.error = error.data.message;
		});
	}

}]);