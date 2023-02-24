const conn = require("../conn");

const getConn = conn.getConn;

var exports = (module.exports = {});

exports.ins_food = async function (
    user_id,
    food_name,
    date,
    gram,
  ) {
    const conn = await getConn();
    
    var temp = `select food_code from ingredient_table where food_name = '${food_name}'`;
    
    let [temp_rows, temp_fields] = await conn.query(temp, []);
    // console.log("템프",temp_rows[0]['food_code']);
    
    if(temp_rows ==''){
      console.log("찾지못함")
      
      return 0
    }else{
    f_c=temp_rows[0]['food_code'];
  
    var ins = `INSERT INTO user_meal_table (user_id,food_code,food_name,date,gram) VALUES('${user_id}',${f_c},'${food_name}','${date}',${gram});`;
  
    let [rows, fields] = await conn.query(ins, []);
    conn.release();
    return rows;}
  };
