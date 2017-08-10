angular.module('fastrApp').controller('SpeedTestController', ['$scope', '$mdMedia', 'httpService', '$filter', function ($scope, $mdMedia, httpService, $filter) {

    $scope.test = 'This is test';


    $scope.httpService = httpService;

    $scope.currentSpeed;

    var current
    $scope.showProgress = true;
    $scope.graphData = [];

    $scope.max;
    $scope.min;

    $scope.lessThanOne = 0;
    $scope.oneToTen = 0;
    $scope.tenToTwenty = 0;
    $scope.twentyToThirty = 0;
    $scope.thirtyToForty = 0;
    $scope.fortyToFifty = 0;
    $scope.greatThanFifty = 0;

    $scope.dataBubble2 = [
        [{
            x: 10,
            y: 10,
            r: ''
        }]
    ]

    var speedtestPromise = $scope.httpService.runSpeedTest();
    speedtestPromise.then(function (results) {
        results = $scope.cutText(results);
        $scope.data[0].push(results);
        var d = new Date();
        var date = $filter('date')(d, 'shortTime')
        $scope.labels.push(date);

        $scope.checkSpeedForBarChart(results);

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


            $scope.checkSpeedForBarChart(results);
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

    $scope.checkSpeedForBarChart = function (speed) {
        if (speed < 1) {
            $scope.lessThanOne++
            $scope.dataBar[0][0] = $scope.lessThanOne;
            console.log($scope.dataBar)

        }
        else if (speed > 1 && speed < 10) {
            $scope.oneToTen++
            $scope.dataBar[0][1] = $scope.oneToTen;
            console.log($scope.dataBar)
        }
        else if (speed > 10 && speed < 20) {
            $scope.lessThanOne++
            $scope.dataBar[0][2] = $scope.lessThanOne;
            console.log($scope.dataBar)

        }
        else if (speed > 20 && speed < 30) {
            $scope.lessThanOne++
            $scope.dataBar[0][3] = $scope.lessThanOne;
            console.log($scope.dataBar)

        }
        else if (speed > 30 && speed < 40) {
            $scope.lessThanOne++
            $scope.dataBar[0][4] = $scope.lessThanOne;
            console.log($scope.dataBar)

        }
        else if (speed > 40 && speed < 50) {
            $scope.lessThanOne++
            $scope.dataBar[0][5] = $scope.lessThanOne;
            console.log($scope.dataBar)

        }
        else if (speed > 50) {
            $scope.lessThanOne++
            $scope.dataBar[0][6] = $scope.lessThanOne;
            console.log($scope.dataBar)

        }






    }


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
                    ticks: { min: 0, max: 60, },
                    labelString: 'Current Speed'
                },
                {
                    id: 'y-axis-2',
                    type: 'linear',
                    display: true,
                    position: 'right',
                    ticks: { min: 0, max: 60, },
                    labelString: 'Average Speed'
                }
            ]
        },
        elements: {
            point: {
                radius: 0
            }
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

    $scope.datasetOverrideBubble = [{ yAxisID: 'y-axis-1' }, { xAxisID: 'x-axis-1' }];
    $scope.optionsBar = {
        scales: {
            yAxes: [
                {
                    id: 'y-axis-1',
                    type: 'linear',
                    display: true,
                    position: 'left',
                    ticks: { min: 0, max: 100, },
                    labelString: 'Current Speed'
                }
            ]
        },
        maintainAspectRatio: false,
    };

    $scope.seriesBar = ['Speed in Mbs'];
    $scope.labelsBar = ['<1', '1-10', '10-20', '20-30', '40-50', '>50'];

    $scope.dataBar = [
        [],
        [],
        [],
        [],
        []
    ];



}]);