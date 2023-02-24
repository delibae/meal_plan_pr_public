var express = require("express");
var router = express.Router();
var sql = require("../../dml/ex/delFood");
const multer = require("multer");

/**
 * @swagger
 *  /api/deleteFood:
 *    post:
 *      tags:
 *      - activity
 *      description: user가 먹은 음식 삭제
 */

/* GET per_date_user listing. */
router.post("/", multer().none(), async function (req, res) {


    var user_id = req.body.user_id; // 나중에 세션으로 바꿔야됨
    // let user_id = req.body.user_id;

    var date = req.body.date;
    var food_name = req.body.food_name;
    var id =req.body.id;
    
    
    var re = await sql.del_food(
      user_id,
      food_name,
      date,
      id,
      
      
    );

    // await sleep(1000);
    // console.log("re",re);
    console.log("Success");

    res.send("Success");
});
module.exports = router;
