var express = require("express");
var router = express.Router();
var sql = require("../../dml/session/up");
const multer = require("multer");
/**
 * @swagger
 *  /api/signup:
 *    post:
 *      tags:
 *      - session
 *      description: 회원 가입 요청
 */
/* GET users listing. */
router.post("/", multer().none(), async function (req, res) {
  user_id = req.body.user_id;
  user_password = req.body.user_password;
  age = req.body.age;
  user_name = req.body.user_name;
  gender = req.body.gender;
  current_weight = req.body.current_weight;
  height = req.body.height;
  goal_weight = req.body.goal_weight;
  d_day = req.body.d_day;
  setting = req.body.setting;
  bmr = req.body.bmr;
  minimum_kcal = req.body.minimum_kcal;
  kcal_per_day = req.body.kcal_per_day;
  profile_path = req.body.profile_path;
  purpose = req.body.purpose;

  var re = await sql.ins_mem(
    user_id,
    user_password,
    age,
    user_name,
    gender,
    current_weight,
    height,
    goal_weight,
    d_day,
    setting,
    bmr,
    minimum_kcal,
    kcal_per_day,
    profile_path,
    purpose
  );
  // console.log(re);
  res.send("/login");
});

module.exports = router;
