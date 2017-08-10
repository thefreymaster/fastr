angular.module('fastrApp').service('httpService', ['$http', function ($http) {


    var service = this;
    console.log('HTTP Service')

    // service.getFirebaseData = function () {
    //     service.ref = new Firebase("https://coin-9681c.firebaseio.com");
    //     service.data = $firebaseObject(service.ref);
    //     return service.data;
    // }


    service.runSpeedTest = function () {
        return $http.get('/api/speedtest').then(function (response) {
            return response.data;

        });
    }

}])