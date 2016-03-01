// Függvény a collekció adatok kezelésére

var db, Users;

function setConnection(mongodb) {
  db = mongodb;
  setModel();
}

function setModel() {
  Users = db.model('Users', {
    name: String,
    email: String,
    phone: String,
    address: String,
    role: Number,
    meta: {
      birthsday: Date,
      hobby: String
    }
  }, 'Users');
}

function read(where, callBack) {
  if (!where) {
    where = {};
  }
  Users.find(where, function (err, data) {
    if (err) {
      console.error('Error in query: ', where);
      data = [];
    }
    if (callBack) {
      callBack(data);
    }
  });
}

function first(where, callBack) {
  read(where, function (data) {
    if (data.length > 0) {
      callBack(data[0]);
    } else {
      callBack(null);
    }
  })
}

function create(document, callBack) {
  var user = new Users(document);
  user.save(function (err) {
    if (err) {
      console.error("Save error: ", err);
    } else {
      callBack(user);
    }
  });
};

module.exports = {
  setConnection: setConnection,
  read: read,
  create: create,
  first: first
};