angular.module('starter.wsp', [])

.factory('fireFactory', [function() {
    return new Firebase("https://amber-torch-6978.firebaseio.com/");
}])

.controller('FireController', ['$scope', 'fireFactory', function($scope, fireFactory) {

    function authHandler(error, authData) {
        if (error) {
            alert("Login Failed!" + angular.toJson(error));
        }
        else {
            alert("login success " + angular.toJson(authData));
        }
    }

    $scope.welcomeMsg = 'Welcome';

    $scope.acc = {
        lgn: '',
        pwd: ''
    };

    $scope.login = function(tmpAcc) {
        fireFactory.authWithPassword({
            email: tmpAcc.lgn,
            password: tmpAcc.pwd
        }, authHandler);
    };
}]);