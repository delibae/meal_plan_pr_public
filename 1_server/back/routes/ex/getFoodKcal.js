var express = require("express");
var router = express.Router();
var sql = require("../../dml/ex/getKcal");
const multer = require("multer");

/**
 * @swagger
 *  /api/getFoodKcal:
 *    post:
 *      tags:
 *      - analysis
 *      description: 음식의 kcal 가져옴
 */

// to do (태희) : 음식의 kcal 가져옴  2023-02-13

router.post("/" ,multer().none(),async function (req, res) {

// if (req.session.uid != undefined){   

    var food = req.body.food;
    
    var re = await sql.getKcalpergram(food);
    
    
    
    
    res.send(re);

    

}


);

module.exports = router;
