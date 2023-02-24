var express = require("express");
var router = express.Router();
var sql = require("../../dml/session/in");
const multer = require("multer");
/**
 * @swagger
 *  /api/login:
 *    post:
 *      tags:
 *      - session
 *      description: 로그인 요청
 */
router.post("/", multer().none(), async function (req, res) {
  user_id = req.body.user_id;
  user_password = req.body.user_password;
  // console.log(user_id, user_password)
  var re = await sql.check_login(user_id, user_password);
  // console.log("re",re);
  // res.send("success");
  console.log("user_id", user_id);
  console.log("pw", user_password);
  if (re !== 0) {
    console.log(re[0].user_id);
    req.session.uid = re[0].user_id;
    console.log("session", req.session);
    req.session.save((err) => {
      if (err) throw err;
    });

    res.send("/dashboard");
  }
});

module.exports = router;
