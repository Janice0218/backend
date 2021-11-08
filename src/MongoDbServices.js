var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";

async function getUserByUsername(username) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      console.log("Database created!");
      var dbo = db.db("website");
      dbo
        .collection("account")
        .find({ username: username })
        .toArray((err, res) => {
          if (err) reject(err);

          console.log("user", res);
          resolve(res);
          db.close();
        });
    });
  });
}
module.exports.getUserByUsername = getUserByUsername;

async function createUser(userInfo) {
  return new Promise(async (resolve, reject) => {
    const users = await getUserByUsername(userInfo.username);

    if (users.length > 0) {
      reject("User exist!");
      return;
    }

    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      console.log("Database created!");
      var dbo = db.db("website");
      dbo.collection("account").insertOne(userInfo, function (err, res) {
        if (err) reject(err);

        db.close();
        resolve("User created!");
      });
    });
  });
}

module.exports.createUser = createUser;
