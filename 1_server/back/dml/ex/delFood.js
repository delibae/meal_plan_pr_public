const conn = require("../conn");

const getConn = conn.getConn;

var exports = (module.exports = {});

exports.del_food = async function (
    user_id,
    food_name,
    date,
    id,
    
  ) {
    const conn = await getConn();
    
    var temp = `select food_code from ingredient_table where food_name = '${food_name}'`;
    let [temp_rows, temp_fields] = await conn.query(temp, []);
    f_c=temp_rows[0]['food_code'];
  
    var ins = `delete from user_meal_table where user_id='${user_id}' and food_name='${food_name}' and date='${date}' and id=${id};`;
  
    let [rows, fields] = await conn.query(ins, []);
    conn.release();
    return rows;
  };
