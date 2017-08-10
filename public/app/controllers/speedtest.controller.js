angular.module('fastrApp').controller('SpeedTestController', ['$scope', '$mdMedia', 'httpService', '$filter', function ($scope, $mdMedia, httpService, $filter) {

    $scope.test = 'Evan';
    $scope.httpService = httpService;

    $scope.currentSpeed;
    $scope.showProgress = true;
    $scope.graphData = [];

    $scope.max;
    $scope.min;

    var speedtestPromise = $scope.httpService.runSpeedTest();
    speedtestPromise.then(function (results) {
        results = $scope.cutText(results);
        $scope.data[0].push(results);
        var d = new Date();
        var date = $filter('date')(d, 'shortTime')
        $scope.labels.push(date);


        var sum = 0;
        for (p = 0; p < $scope.data[0].length; p++) {
            sum += $scope.data[0][p];
        }
        var average = sum / $scope.data[0].length
        $scope.data[1].push(average);
        // $scope.max = $scope.data[0].max();
        // $scope.min = $scope.data[0].min();

        // console.log(results);
        $scope.currentSpeed = results;
        $scope.showProgress = false;

    })
    $scope.rerunTest = function () {

        var speedtestPromise = $scope.httpService.runSpeedTest();
        speedtestPromise.then(function (results) {
            results = $scope.cutText(results);
            console.log($scope.data);
            console.log(results);

            $scope.data[0].push(results);
            var d = new Date();
            var date = $filter('date')(d, 'shortTime');
            // $scope.max = $scope.data[0].max();
            // $scope.min = $scope.data[0].min();
            $scope.labels.push(date);
            var sum = 0;
            for (p = 0; p < $scope.data[0].length; p++) {
                sum += $scope.data[0][p];
            }
            var average = sum / $scope.data[0].length
            $scope.data[1].push(average);
            $scope.currentSpeed = results;

        })
    }

    $scope.cutText = function (text) {
        var check = text.indexOf('Kbps');
        if (check != -1) {
            var str = text.replace(' Kbps', '');
            str = parseInt(str, 10);
            str = str * .001;

            return str;
        }
        else {
            var str = text.replace(' Mbps', '');
            str = parseInt(str, 10);
            return str;
        }
    };

    Array.prototype.max = function () {
        return Math.max.apply(null, this);
    };

    Array.prototype.min = function () {
        return Math.min.apply(null, this);
    };


    setInterval(function () {
        $scope.rerunTest();
    }, 60000)

    $scope.colors = ['#673ab7']
    $scope.labels = [];
    $scope.series = ['Speeds', 'Speed Average'];
    $scope.data = [
        [],
        []
    ];
    $scope.onClick = function (points, evt) {
        console.log(points, evt);
    };
    $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
    $scope.options = {
        scales: {
            yAxes: [
                {
                    id: 'y-axis-1',
                    type: 'linear',
                    display: true,
                    position: 'left',
                    ticks: { min: 0, max: 50, },
                    labelString: 'Current Speed'
                },
                {
                    id: 'y-axis-2',
                    type: 'linear',
                    display: true,
                    position: 'right',
                    ticks: { min: 0, max: 50, },
                    labelString: 'Average Speed'
                }
            ]
        },
        legend: { display: true }
    };

    $scope.countUpOptions = {
        useEasing: true,
        useGrouping: true,
        separator: ',',
        decimal: '.',
        prefix: '',
        suffix: ' Mbs'
    };



}]);