'user strict';

angular.module('authModule').controller('signinAuthController', ['registerUserConfigFactory', '$scope', '$http', '$location', '$rootScope', function (registerUserConfigFactory, $scope, $http, $location, $rootScope) {
	
	var user = registerUserConfigFactory.getUser();
	if(user){
		page(user.role);
	}

	function page (role) {
		if(!role){ return false; };
		switch(role){
			case "admin":
				$location.path('/admin/report');
				break;
			case "consultant":
				$location.path('/consultant/memos');
				break;
			case "employee":
				$location.path('/employee/sessions');
				break;
			case "client":
				$location.path('/client/case');
				break;
		}
	}

	$scope.signIn = function () {
		$http.post('/api/v1/login', $scope.credentials)
		.success(function (data, success) {
			registerUserConfigFactory.setUser(data);
			if($rootScope.lastPage){
				$location.path($rootScope.lastPage);
			} else {
				page(data.role);
			}
		})
		.error(function (data, error) {
			$scope.error = data;
		});
	};
}]);