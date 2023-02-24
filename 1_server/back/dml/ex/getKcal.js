const conn = require("../conn");

const getConn = conn.getConn;

var exports = (module.exports = {});

// to do (태희) : 음식 넣으면 kcal 반환

exports.getKcalpergram = async function (food) {
    const conn = await getConn();
    var ins = `SELECT kcal, protein, fat, carbo FROM ingredient_table where food_name='${food}'`;
  
    let [rows, fields] = await conn.query(ins, []);
    conn.release();
    
    return rows[0];
}


