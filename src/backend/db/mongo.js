var connectionString =
  process.env["CUSTOMCONNSTR_mongoConnection"] ||
  "mongodb+srv://nodejspoi:nodejspoi@cluster0-cp7iq.azure.mongodb.net/test?retryWrites=true&w=majority";

const MongoClient = require("mongodb").MongoClient;
const dbName = "nodejs";
const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

function OpenDB() {
  return new Promise(function(resolve, reject) {
    if (!client.isConnected()) {
      console.log("client connect:" + connectionString);
      return client.connect(function(err) {
        if (err == null) {
          resolve("Connection Success!");
        } else {
          reject(err);
        }
      });
    } else {
      return new Promise(function(resolve, reject) {
        reject("Already Connected!");
      });
    }
  });
}

function CloseDB() {
  return new Promise(function(resolve, reject) {
    if (client.isConnected()) {
      return client.close(function(err) {
        if (err == null) {
          resolve("Disconnection Success!");
        } else {
          reject(err);
        }
      });
    } else {
      reject("Already Disconnected!");
    }
  });
}

function InsertDB(table, model) {
  return new Promise(function(resolve, reject) {
    if (client.isConnected()) {
      client
        .db(dbName)
        .collection(table)
        .insertOne(model)
        .then(function(res) {
          resolve(res);
        })
        .catch(function(err) {
          reject(err);
        });
    } else {
      reject("Not Connected!");
    }
  });
}

function SelectDB(table, query, fields) {
  return new Promise(function(resolve, reject) {
    if (client.isConnected()) {
      client
        .db(dbName)
        .collection(table)
        .find(query)
        .project(fields)
        .toArray(function(err, res) {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        });
    } else {
      reject("Not Connected!");
    }
  });
}

function UpdateDB(table, query, values) {
  return new Promise(function(resolve, reject) {
    if (client.isConnected()) {
      client
        .db(dbName)
        .collection(table)
        .updateMany(query, values, function(err, r) {
          if (err) {
            reject(err);
          } else {
            resolve(r);
          }
        });
    } else {
      reject("Not Connected!");
    }
  });
}

function DeleteDB(table, query) {
  return new Promise(function(resolve, reject) {
    if (client.isConnected()) {
      client
        .db(dbName)
        .collection(table)
        .deleteMany(query, function(err, r) {
          if (err) {
            reject(err);
          } else {
            resolve(r);
          }
        });
    } else {
      reject("Not Connected!");
    }
  });
}

module.exports = {
  OpenDB,
  CloseDB,
  InsertDB,
  SelectDB,
  UpdateDB,
  DeleteDB
};
