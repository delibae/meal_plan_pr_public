const conn = require("../conn");

const getConn = conn.getConn;

var exports = (module.exports = {});

exports.ins_activity = async function (
  user_id,
  working_out_code2,
  date,
  working_time
) {
  const conn = await getConn();
  var ins = `INSERT INTO activity_table(user_id,working_out_code2,date,working_time) VALUES('${user_id}','${working_out_code2}','${date}',${working_time});`;

  let [rows, fields] = await conn.query(ins, []);
  conn.release();
  return rows;
};
