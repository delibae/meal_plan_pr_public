var express = require("express");
const multer = require("multer");
var router = express.Router();
var sql = require("../../dml/all_pages/prof");
/**
 * @swagger
 *  /api/profile:
 *    get:
 *      tags:
 *      - all_pages
 *      description: 프로필 데이터 요청
 */

/* GET per_date_user listing. */
router.get("/", async function (req, res) {
  // user_id = req.body.user_id;
  if (req.session.uid != undefined) {
    let user_id = req.session.uid;
    date = req.body.date;
    var re = await sql.get_profile(user_id);
    // console.log("re",re);
    res.send(re);
  }
});

/**
 * @swagger
 *  /api/profile/updateGoal:
 *    post:
 *      tags:
 *      - all_pages
 *      description: 목표 수정 요청
 */

router.post("/updateGoal", multer().none(), async function (req, res) {
  if (req.session.uid != undefined) {
    var user_id = req.session.uid;
    var current_weight = req.body.current_weight;
    var goal_weight = req.body.goal_weight;
    var d_day = req.body.d_day;
    var minimum_kcal = req.body.minimum_kcal;
    var purpose = req.body.purpose;
    var kcal_per_day = req.body.kcal_per_day;
    var bmr = req.body.bmr;

    var re = await sql.updateGoal_profile(
      user_id,
      current_weight,
      goal_weight,
      d_day,
      minimum_kcal,
      purpose,
      kcal_per_day,
      bmr
    );

    res.send(re);
  }
});

module.exports = router;
