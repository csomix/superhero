var express = require('express');
//var itf = require('./my_modules/itf_module');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/superhero');

var Users = require('./models/users');
Users.setConnection(mongoose);
/*
Users.create({
  name: 'John Doe',
  email: 'john.doe@gmail.com',
  phone: '+36301234567',
  address: '1122 Budapest, Kiss u. 10',
  role: 3,
  meta: {
    birthsday: new Date('1994-07-04'),
    hobby: 'golf'
  }
}, function (saved) {
  console.info("Saved model: ", saved);
});
*/
/*
Users.read({
  'role': 1
}, function (users) {
  console.info("Users:", users);
});
*/

Users.first({
  'role': 3
}, function (user) {
  console.info("User name:", user.name);
});


var fs = require('fs');
var port = 3000;
var staticDir = 'build';

var app = express();
app.set('view engine', 'jade');
app.set('views', './src/view');

/*
var str = 'ItFactory Meetup...';
itf.tu(str, function (err, newStr) {
  if (err) {
    console.error(err);
  } else {
    console.log('New string is ', newStr);
  }
});
*/

app.use(express.static(staticDir));

// Express use használata
app.use(function (req, res, next) {
  if (req.headers['x-requested-with'] == 'XMLHttpRequest') {
    console.log('Ajax kérés folyamatban!');
    res.send(JSON.stringify({
      'hello': 'world'
    }));
  } else {
    next();
  }
  // console.log(req.headers);
});

app.get('/', function (req, res, next) {
  handleUsers(req, res, false, function (allUsers) {
    res.render('index', {
      title: 'IT Factory Web SuperHero',
      message: 'Yes, It is!',
      users: allUsers
    });
  });
  /*    fs.readFile('./' + staticDir + '/index.html', 'utf8', function (err, data) {
          res.send(data);
      });
  */
});

function handleUsers(req, res, next, callBack) {
  fs.readFile('./users.json', 'utf8', function (err, data) {
    if (err) throw err;
    // var path = req.url.split ('/');
    var users = JSON.parse(data);
    if (callBack) {
      callBack(users);
      return;
    }
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
