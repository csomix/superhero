var mongoose = require("mongoose");

// Függvény a collekció adatok kezelésére

var db, Users, Orders, models = {};

function setConnection(mongodb) {
  db = mongodb;
  setModel();
}

function setModel() {
  var Schema = mongoose.Schema;
  var userSchema = new Schema({
    name: String,
    email: String,
    phone: String,
    address: String,
    role: Number,
    meta: {
      birthsday: Date,
      hobby: String
    },
    orders: [{
      type: Schema.Types.ObjectId,
      ref: 'Orders'
    }]
  });

  userSchema.statics.isAdmin = function (r, cb) {
    return this.find({
      'role': {
        $lte: 2
      }
    }, cb);
  };

  Users = db.model('Users', userSchema, 'Users');

  var orderSchema = new Schema({
    _creator: {
      type: Schema.Types.ObjectId,
      ref: 'Users'
    },
    insDate: Date,
    description: String,
    product: String,
    amount: Number,
    deadLine: Date
  });
  Orders = db.model('Orders', orderSchema, 'Orders');
  models['Users'] = Users;
  models['Orders'] = Orders;
};

function getModel(modelName) {
  if (!modelName) {
    return Users;
  } else {
    return models[modelName];
  }
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
  first: first,
  getModel: getModel
};
