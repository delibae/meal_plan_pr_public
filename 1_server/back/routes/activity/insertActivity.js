var express = require("express");
var router = express.Router();
var sql = require("../../dml/activity/insertAct");
const multer = require("multer");

/**
 * @swagger
 *  /api/insertActivity:
 *    post:
 *      tags:
 *      - activity
 *      description: 운동 시간 종류 입력
 */

/* GET per_date_user listing. */
router.post("/", multer().none(), async function (req, res) {
  if (req.session.uid != undefined) {
    var user_id = req.session.uid;
    // let user_id = req.body.user_id;

    var date = req.body.date;
    var working_out_code2 = req.body.working_out_code2;
    var working_time = req.body.working_time;
    var re = await sql.ins_activity(
      user_id,
      working_out_code2,
      date,
      working_time
    );

    // await sleep(1000);
    // console.log("re",re);
    console.log("Success");

    res.send("Success");
  }
});

module.exports = router;
