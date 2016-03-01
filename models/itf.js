// MongoDBB adatmodel kezeli a táblát. itf.
var db, itf;

function setConnection(mongodb) {
  db = mongodb;
  setModel();
}

function setModel() {
  // var dataSchema = new Schema ( {}, { collection: 'itf'})

  itf = db.model('itf', {
    name: String,
    email: String,
    order: {
      date: Date,
      amount: Number,
      status: String,
      product: String
    }
  }, 'itf');

  /*
  var user = new itf({
    'name': 'Joe'
  });
  user.save();
  */

}
// Kollekció modelje

// Adatok olvasása a táblából / collectionból
function read(where, callBack) {
  itf.find(where, function (err, data) {
    if (err) {
      console.error('Error in query: ', where);
      callBack({});
    } else {
      callBack(data);
    }
  });
}

module.exports = {
  setConnection: setConnection,
  read: read
};
