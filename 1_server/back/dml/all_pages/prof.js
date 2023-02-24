const conn = require("../conn");

const getConn = conn.getConn;

var exports = (module.exports = {});

exports.get_profile = async function (user_id) {
  const conn = await getConn();
  var check = "SELECT * From user_table where user_id = '{0}'".format(user_id);
  let [rows, fields] = await conn.query(check, []);
  conn.release();
  // console.log(rows);
  if (rows.length == 0) {
    return 0;
  } else {
    return rows;
  }
};


exports.updateGoal_profile = async function (
  user_id,
  current_weight,
  goal_weight,
  d_day,
  minimum_kcal,
  purpose,
  kcal_per_day,
  bmr
) {
  const conn = await getConn();
  var check = `UPDATE user_table
  SET current_weight = ${current_weight}, goal_weight = ${goal_weight}, d_day = '${d_day}', minimum_kcal=${minimum_kcal}, purpose = ${purpose}, bmr = ${bmr}, kcal_per_day = ${kcal_per_day}
  WHERE user_id = '${user_id}'`;
  let [rows, fields] = await conn.query(check, []);
  conn.release();
  return "complete";
};