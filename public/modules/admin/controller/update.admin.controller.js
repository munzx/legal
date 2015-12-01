'use strict';

angular.module('adminModule').controller('updateTypesAdminController', ['$scope', '$modal', 'connectUpdateTypeFactory', function ($scope, $modal, connectUpdateTypeFactory) {
	connectUpdateTypeFactory.query({}, function(response){
		$scope.updatetypes = response;
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
			$scope.updatetypes[index] = response;
		}, function(error){
			$scope.error = error.data.message;
		});
	}

}]);