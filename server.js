var http = require("http");
var https = require("https");
var express = require('express');

var tls = require('tls');
var fs = require('fs');
var cmd=require('node-cmd');

var bodyParser = require('body-parser');
// var request = require('request-ssl');
// request.addFingerprint('api.robinhood.com', '8F:C1:46:FB:19:0A:16:FF:F7:D1:E6:48:5C:74:54:0E:00:FF:36:A6');
// request.addFingerprint('coin-canvas23.herokuapp.com', '08:3B:71:72:02:43:6E:CA:ED:42:86:93:BA:7E:DF:81:C4:BC:62:30');

    cmd.get(
        'fast',
        function(err, data, stderr){
            console.log('Current internet speed is:\n\n',data)
        }
    );



















var app = express();
app.listen(process.env.PORT || 4002, function () { 
    console.log('Running REST HTTPS server');
});



// var options = {
//    key  : fs.readFileSync('server.enc.key'),
//    cert : fs.readFileSync('server.crt')
// };

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(express.static(__dirname + '/public'));



// http.createServer(options, app).listen(process.env.PORT || 3000, function () { 
//     console.log('Running REST HTTPS server at port 3000');
// });




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

