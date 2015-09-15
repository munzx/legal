'use strict';

angular.module('calendarModule').controller('actionsCalendarController', ['$scope', '$modalInstance', 'user', 'task', '$modal', function ($scope, $modalInstance, user, task, $modal) {
	$scope.closeModal = function(){
		$modalInstance.dismiss('cancel');
	}

	$scope.task = task;
	$scope.user = user;

	$scope.isAuthor = (user._id == task.user._id)? true: false;
	$scope.isResponsibility = (user._id == task.responsibility._id)? true: false;

	var inlineConfirmMsg = '<div class="row">
							<div class="col-md-12">
								<h5 ng-bind="msg"></h5>
							</div>
							<div class="col-md-12">
								<button class="btn btn-sm btn-block" ng-class="{\'btn-danger\': isWarning == true, \'btn-success\': isWarning == false }" ng-click="confrimYes()">نعم</button>
							</div>
							<div class="col-md-12">
								<button class="btn btn-sm btn-block" ng-class="{\'btn-success\': isWarning == true, \'btn-danger\': isWarning == false }" ng-click="confrimNo()">لا</button>
							</div>
						</div>';


	$scope.markDoneConfirm = function(){
		if(($scope.task.removed === false) && ($scope.task.rejected === false) && ($scope.task.status == 'pending')){
			$modal.open({
				template: inlineConfirmMsg,
				controller: ['$scope', '$modalInstance', 'connectCalendarFactory', 'task', 'parentModalInstance', function($scope, $modalInstance, connectCalendarFactory, task, parentModalInstance){
					$scope.isWarning = false;
					$scope.msg = 'هل ترغب بتأكيد الإنتهاء من المهمة';

					$scope.confrimYes = function(){
						connectCalendarFactory.get({'id': task._id, 'subaction': 'done'}, function(response){
							task.status = 'close';
							$modalInstance.dismiss('cancel');
							parentModalInstance.dismiss('cancel');
						}, function(error){
							$scope.error = error.data.message;
						});
					}

					$scope.confrimNo = function(){
						$modalInstance.dismiss('cancel');
					}
				}],
				size: 'sm',
				backdrop: 'static',
				resolve: {
					task: function(){
						return $scope.task;
					},
					parentModalInstance: function(){
						return $modalInstance;
					}
				}
			});
		}
	}

	$scope.softRemoveConfirm = function(){
		if(($scope.task.removed === false) && ($scope.task.rejected === false) && ($scope.task.status == 'pending')){
			$modal.open({
				template: inlineConfirmMsg,
				controller: ['$scope', '$modalInstance', 'connectCalendarFactory', 'task', 'parentModalInstance', function($scope, $modalInstance, connectCalendarFactory, task, parentModalInstance){
					$scope.isWarning = true;
					$scope.msg = 'هل ترغب بحذف المهمة';

					$scope.confrimYes = function(){
						connectCalendarFactory.remove({'id': task._id, 'subaction': 'softRemove'}, function(response){
							task.removed = true;
							$modalInstance.dismiss('cancel');
							parentModalInstance.dismiss('cancel');
						}, function(error){
							$scope.error = error.data.message;
						});
					}

					$scope.confrimNo = function(){
						$modalInstance.dismiss('cancel');
					}
				}],
				size: 'sm',
				backdrop: 'static',
				resolve: {
					task: function(){
						return $scope.task;
					},
					parentModalInstance: function(){
						return $modalInstance;
					}
				}
			});
		}
	}


	$scope.markRejectedConfirm = function(){
		if(($scope.task.removed === false) && ($scope.task.rejected === false) && ($scope.task.status == 'pending')){
			$modal.open({
				template: inlineConfirmMsg,
				controller: ['$scope', '$modalInstance', 'connectCalendarFactory', 'task', 'parentModalInstance', function($scope, $modalInstance, connectCalendarFactory, task, parentModalInstance){
					$scope.isWarning = true;
					$scope.msg = 'هل ترغب بتأكيد رفض المهمة';

					$scope.confrimYes = function(){
						connectCalendarFactory.get({'id': task._id, 'subaction': 'reject'}, function(response){
							task.rejected = true;
							$modalInstance.dismiss('cancel');
							parentModalInstance.dismiss('cancel');
						}, function(error){
							$scope.error = error.data.message;
						});
					}

					$scope.confrimNo = function(){
						$modalInstance.dismiss('cancel');
					}
				}],
				size: 'sm',
				backdrop: 'static',
				resolve: {
					task: function(){
						return $scope.task;
					},
					parentModalInstance: function(){
						return $modalInstance;
					}
				}
			});
		}
	}


}]);