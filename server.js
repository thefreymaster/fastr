var http = require("http");
var https = require("https");
var express = require('express');

var tls = require('tls');
var fs = require('fs');
var cmd=require('node-cmd');

var bodyParser = require('body-parser');

    cmd.get(
        'fast',
        function(err, data, stderr){
            console.log('Current internet speed is:\n\n',data)
        }
    );

var app = express();
var port = 4301;
app.listen(process.env.PORT || port, function () { 
    console.log('Running REST HTTPS server on port: '+port);
});

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(express.static(__dirname + '/public'));

app.get('/', function (request, response){
    response.sendFile(path.resolve(__dirname, '/public', 'index.html'));
});


app.get('/api/speedtest', function(req, res){
    cmd.get(
        'fast',
        function(err, data, stderr){
            console.log('Current internet speed is:\n\n',data)
            res.send(data);
        }
    );
});

