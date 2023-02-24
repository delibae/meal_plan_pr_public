const conn = require("../conn");

const getConn = conn.getConn;

var exports = (module.exports = {});

exports.update_perday = async function (
    user_id, 
    date,
    weight,
    losekcal,
    consumekcal
  ) {
    const conn = await getConn();
    
    var temp = `SELECT * FROM per_day_information_table where user_id='${user_id}' and date='${date}';`
    
    let [temp_rows, temp_fields] = await conn.query(temp, []);
    f_c=temp_rows[0];
    console.log("f_c",f_c);
    if(f_c===undefined){
        console.log("오늘 기록 없음");
        var ins = `INSERT INTO per_day_information_table (user_id,weight,lose_kcal,kcal_consume,date) VALUES('${user_id}',${weight},${losekcal},${consumekcal},'${date}');`;
    }else{
        var ins = `UPDATE per_day_information_table SET weight=${weight}, lose_kcal=${losekcal}, kcal_consume=${consumekcal} WHERE user_id='${user_id}' and date='${date}';`
    }
    
   
    let [rows, fields] = await conn.query(ins, []);
    conn.release();
    return rows;
  };
