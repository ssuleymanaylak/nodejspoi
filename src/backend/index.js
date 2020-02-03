var express = require("express");
const port = process.env.PORT || 8080;

const app = express();

app.use(function(req, res) {
  res.json({
    message: "Hello From Azure NodeJS App"
  });
});

app.listen(port, () => {
  console.log("App Initialized!");
});
