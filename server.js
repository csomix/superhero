var express = require('express');
var itf = require('./my_modules/itf_module');
var fs = require('fs');
var port = 3000;
var staticDir = 'build';

var app = express();

app.use(express.static(staticDir));

// Express use használata
app.use(function (req, res, next) {
    console.log('request url: ', req.url);
    next();
});

app.get('/', function (req, res, next) {
    fs.readFile('./' + staticDir + '/index.html', 'utf8', function (err, data) {
        res.send(data);
    });
});

function handleUsers(req, res) {
    fs.readFile('./users.json', 'utf8', function (err, data) {
        if (err) throw err;
        // var path = req.url.split ('/');
        var users = JSON.parse(data);
        var _user = {};

        if (req.params.id) {
            for (var k in users) {
                // path
                if (req.params.id == users[k].id) {
                    _user = users[k];
                }
            }
        } else {
            _user = users;
        }

        // console.log(data);
        res.send(JSON.stringify(_user));
    });
}

app.get('/users/:id*?', function (req, res, next) {
    console.log(req.url);
    handleUsers(req, res);
});

app.listen(port);
console.log("Server running in localhost:" + port);
