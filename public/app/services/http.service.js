angular.module('fastrApp').service('httpService', ['$http', function ($http) {


    var service = this;
    console.log('HTTP Service')



    service.runSpeedTest = function () {
        return $http.get('/api/speedtest').then(function (response) {
            return response.data;

        });
    }

}])