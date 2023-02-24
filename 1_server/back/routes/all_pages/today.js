var express = require("express");

var router = express.Router();
var sql = require("../../dml/all_pages/tod");
/**
 * @swagger
 *  /api/today:
 *    get:
 *      tags:
 *      - all_pages
 *      description: 금일 및 전날 데이터 요청
 */

/* GET per_date_user listing. */
router.get("/total", async function (req, res) {
  // let user_id = req.body.user_id;
  if (req.session.uid != undefined) {
    var user_id = req.session.uid;
    var date = req.query.date;
    // console.log("user_id", user_id)
    // console.log("date:", date);
    var re = await sql.getToday(user_id, date);

    res.send(re);
  }
});

module.exports = router;
