var express = require("express");

var router = express.Router();
var sql = require("../../dml/dashboard/lineCh");
/**
 * @swagger
 *  /api/lineChart/days:
 *    get:
 *      tags:
 *      - dashboard
 *      description: 일자별 그래프 데이터 요청
 */
/* GET per_date_user listing. */
router.get("/days", async function (req, res) {
  // let user_id = req.body.user_id;
  if (req.session.uid != undefined) {
    var user_id = req.session.uid;
    var date = req.query.date;
    // console.log("user_id", user_id)
    // console.log("date:", date);
    var re = await sql.getNineDays(user_id, date);
    // console.log("re",re);
    // console.log("여기다",re);
    res.send(re);
  }
});
/**
 * @swagger
 *  /api/lineChart/month:
 *    get:
 *      tags:
 *      - dashboard
 *      description: 월별 그래프 데이터 요청
 */
router.get("/month", async function (req, res) {
  if (req.session.uid != undefined) {
    var user_id = req.session.uid;
    var date = req.query.date;
    var re = await sql.getNineMonth(user_id, date);

    // console.log("re",re);
    res.send(re);
  }
});

module.exports = router;
