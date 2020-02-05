var db = require("../db/mongo");

module.exports = function(request, response) {
  return new Promise(function(resolve, reject) {
    var result = {
      success: false,
      message: ""
    };

    var { id } = request.body;
    if (id) {
      db.SelectDB("points", { id }, {})
        .then(function(pointResult) {
          if (
            pointResult.length > 0 &&
            pointResult[0].navigation.properties.isVisibleOnList
          ) {
            result.success = true;
            result.message = "";
            result.pointInfo = {};
            result.pointInfo.id = pointResult[0].id;
            result.pointInfo.title = pointResult[0].title;
            result.pointInfo.description = pointResult[0].description;
            result.pointInfo.location = {};
            result.pointInfo.location = pointResult[0].location;

            resolve(result);
          } else {
            result.success = false;
            result.message = "Error";
            reject(result);
          }
        })
        .catch(function(err) {
          result.success = false;
          result.message = "Error";
          reject(result);
        });
    } else {
      result.success = false;
      result.message = "Error";
      reject(result);
    }
  });
};
