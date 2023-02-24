var express = require("express");

var router = express.Router();
var sql = require("../../dml/update_db/insPDay");
/**
 * @swagger
 *  /api/insertPD:
 *    post:
 *      tags:
 *      - update_db
 *      description: 일자별 총 데이터 입력
 */
/* GET per_date_user listing. */
router.post("/", async function (req, res) {
  user_id = req.body.uid;
  // console.log(req.session.user_id, "<-");
  if (req.session.uid != undefined) {
    let user_id = req.session.uid;
    // let user_id = req.body.user_id;
    let weight = req.body.weight;
    let lose_kcal = req.body.lose_kcal;
    let kcal_consume = req.body.kcal_consume;
    let date = req.body.date;

    var re = await sql.insertPerDay(
      user_id,
      weight,
      lose_kcal,
      kcal_consume,
      date
    );

    // await sleep(1000);
    // console.log("re",re);
    // console.log("Success");

    res.send("Success");
  }
});

module.exports = router;
