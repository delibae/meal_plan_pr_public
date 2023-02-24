var express = require("express");
var router = express.Router();
var sql = require("../../dml/sql.js");
const multer = require("multer");
/**
 * @swagger
 *  /api/session:
 *    get:
 *      tags:
 *      - session
 *      description: 세션 호출
 */
/* GET users listing. */
router.get("/", async function (req, res) {
  console.log(req.session.uid);
  res.send(req.session.uid);
});

module.exports = router;
