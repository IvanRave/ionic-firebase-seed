angular.module('starter.wsp', ['firebase'])

.factory('fireFactory', ['$firebaseAuth', function($firebaseAuth) {
    var ref = new Firebase("https://amber-torch-6978.firebaseio.com/");
    var myAuth = $firebaseAuth(ref);

    return {
        myAuth: myAuth
    };
}])

.controller('FireController', ['$log', '$scope', 'fireFactory', function($log, $scope, fireFactory) {
    $scope.welcomeMsg = 'Welcome';

    $scope.acc = {
        lgn: 'test@example.com',
        pwd: '123321'
    };

    $scope.authObj = fireFactory.myAuth;

    $scope.login = function(tmpAcc) {
        $scope.authObj.$authWithPassword({
            email: tmpAcc.lgn,
            password: tmpAcc.pwd
        }).then(function(authData) {
            alert('Logged as ' + angular.toJson(authData));
            $log.log("Logged in as:", authData);
        }).catch(function(error) {
            $log.log("Authentication failed:", error);
            alert('Auth failed: ' + angular.toJson(error));
        });

        // fireFactory.authWithPassword({
        //     email: tmpAcc.lgn,
        //     password: tmpAcc.pwd
        // }, authHandler);
    };
}]);