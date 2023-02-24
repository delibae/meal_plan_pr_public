var express = require("express");
var router = express.Router();
var sql = require("../../dml/activity/getAct");
const multer = require("multer");

/**
 * @swagger
 *  /api/getTodayActivity:
 *    get:
 *      tags:
 *      - analysis
 *      description: 유저가 오늘 한 운동, 시간 갖고옴
 */

// to do (태희) : 운동기록 페이지에 유저의 오늘 운동 기록 띄워주기 위함
// post맨으로 돌아가는거 확인함 작성날자 : 2023/2/10
router.get("/" ,multer().none(),async function (req, res) {

// if (req.session.uid != undefined){   
//     var user_id = req.body.user_id;
//     var date = req.body.date;
//     var re = await sql.getTodayActivity(user_id, date);
    
//     console.log(re);
//     let arr = ['걷기','러닝','줄넘기','수영','자전거','에어로빅 및 필라테스'];
//     var act_list = [];
    
//     for(let i =0;i<Object.keys(re).length;i++){
//         var code = Number(re[i]["working_out_code2"]);
//         act_list.push( [arr[code], re[i]["working_time"]]);
//     }
    
    
    
//     res.send(act_list);
// }

    var user_id = req.body.user_id;
    var date = req.body.date;
    var re = await sql.getTodayActivity(user_id, date);
    
    console.log(re);
    let arr = ['걷기','러닝','줄넘기','수영','자전거','에어로빅 및 필라테스'];
    var act_list = [];
    
    for(let i =0;i<Object.keys(re).length;i++){
        var code = Number(re[i]["working_out_code2"]);
        act_list.push( [arr[code], re[i]["working_time"]]);
    }
    
    
    
    res.send(act_list);

    

}


);

module.exports = router;
