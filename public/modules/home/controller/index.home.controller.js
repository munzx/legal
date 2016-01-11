'user strict';

angular.module('homeModule').controller('indexHomeController', ['registerUserConfigFactory', 'connectContactHomeFactory', '$location', '$scope', function (registerUserConfigFactory, connectContactHomeFactory, $location, $scope) {
	$scope.user = registerUserConfigFactory.getUser();

	if($scope.user){
		page($scope.user.role);
	}

	function page (role) {
		if(!role){ return false; };
		switch(role){
			case "admin":
				$location.path('/admin/report');
				break;
			case "consultant":
				$location.path('/consultant');
				break;
			case "employee":
				$location.path('/employee');
				break;
			case "client":
				$location.path('/client');
				break;
		}
	}

}]);