angular.module('starter.wsp', ['firebase'])

.factory('fireFactory', ['$firebaseAuth', '$firebase', function($firebaseAuth, $firebase) {
    var ref = new Firebase("https://amber-torch-6978.firebaseio.com/");
    var myAuth = $firebaseAuth(ref);
    
    var childRef = ref.child('qwer')
        // Queries can currently only order by one key at a time
        // https://www.firebase.com/docs/web/api/query/orderbychild.html
        .orderByChild("body").limitToLast(10);

    var myFire = $firebase(childRef);

    return {
        myAuth: myAuth,
        myFire: myFire
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

    $scope.orders = fireFactory.myFire.$asArray();

    $scope.addOrder = function() {
        $scope.orders.$add({
            from: 'DemoFrom',
            body: 'order number ' + new Date().getSeconds()
        });
    };
}]);