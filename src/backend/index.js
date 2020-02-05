var express = require("express");
const port = process.env.PORT || 8080;
var db = require("./db/mongo");

db.OpenDB()
  .then(result => {
    console.log("DB Connection OK:" + result);
    const app = express();

    app.use(function(req, res) {
      res.json({
        message: "Hello From Azure NodeJS App"
      });
    });

    app.listen(port, () => {
      console.log("App Initialized!");
    });
  })
  .catch(err => {
    console.log("DB ERROR:" + err);
  });
