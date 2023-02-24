var express = require("express");

var router = express.Router();
var sql = require("../../dml/analysis/getPr");
/**
 * @swagger
 *  /api/getPeriod:
 *    get:
 *      tags:
 *      - analysis
 *      description: 기간 설정 -> 기간 데이터 및 통계 요청
 */

router.get("/", async function (req, res) {
  if (req.session.uid != undefined) {
    var user_id = req.session.uid;
    var startDate = req.query.startDate;
    var endDate = req.query.endDate;
    var re = await sql.getPeriod(user_id, startDate, endDate);
    // console.log("re",re);
    res.send(re);
  }
});

module.exports = router;
