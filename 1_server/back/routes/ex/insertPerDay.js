var express = require("express");
var router = express.Router();
var sql = require("../../dml/ex/insertPerDay");
const multer = require("multer");

/**
 * @swagger
 *  /api/insertPerDay:
 *    post:
 *      tags:
 *      - ex
 *      description: user의 오늘 정보 등록
 */

/* GET per_date_user listing. */
router.post("/", multer().none(), async function (req, res) {
    console.log("됨");

    var user_id = req.body.user_id;  // 나중에 세션으로 바꿔야됨
    // let user_id = req.body.user_id;
    var weight = req.body.weight;
    var date = req.body.date;
    var losekcal = req.body.losekcal;
    var consumekcal = req.body.consumekcal;
    
    var re = await sql.update_perday(
        user_id, 
        date,
        weight,
        losekcal,
        consumekcal
      
    );

    // await sleep(1000);
    // console.log("re",re);
    console.log("Success");

    res.send("Success");
});

module.exports = router;
