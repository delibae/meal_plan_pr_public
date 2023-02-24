var express = require("express");
var router = express.Router();
var sql = require("../../dml/sql.js");
const multer = require("multer");

// ENV
var session = require("express-session");
var MySQLStore = require("express-mysql-session")(session);
var options = {
  host: "",
  user: "",
  password: "",
  database: "",
  port: 3306,
};
/**
 * @swagger
 *  /api/login:
 *    get:
 *      tags:
 *      - session
 *      description: 세션 파기 요청
 */
var sessionStore = new MySQLStore(options);
/* GET users listing. */
router.get("/", async function (req, res) {
  // delete req.session.uid;

  // req.session.save(function(){
  //   res.send(req.session);
  // })

  await req.session.destroy();
  await res.clearCookie("sid");
  res.send("logout");
});

module.exports = router;
