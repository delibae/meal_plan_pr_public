const conn = require("../conn");

const getConn = conn.getConn;

var exports = (module.exports = {});

//per_day_information table에 insert하기 (router : insertPerday.js)
exports.insertPerDay = async function (
  user_id,
  weight,
  lose_kcal,
  kcal_consume,
  date
) {
  const conn = await getConn();

  let sqlQuery = `INSERT INTO per_day_information_table (user_id, weight, lose_kcal, kcal_consume, date) 
    VALUES ('${user_id}', ${weight}, ${lose_kcal}, ${kcal_consume}, '${date}')`;

  let [rows, fields] = await conn.query(sqlQuery, []);

  conn.release();
  return "complete";
};
