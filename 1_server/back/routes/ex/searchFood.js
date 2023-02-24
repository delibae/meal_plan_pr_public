var express = require("express");

var router = express.Router();
var sql = require("../../dml/ex/searchF");

router.get("/", async function (req, res) {
  // if (req.session.uid != undefined) {
  //   var user_id = req.session.uid;
  //   var startDate = req.query.startDate;
  //   var endDate = req.query.endDate;
  var re = await sql.searchFood();
  // console.log("re",re);
  res.send(re);
  // }
});

module.exports = router;
