const conn = require("../conn");

const getConn = conn.getConn;

var exports = (module.exports = {});

String.prototype.format = function () {
  // store arguments in an array
  var args = arguments;
  // use replace to iterate over the string
  // select the match and check if the related argument is present
  // if yes, replace the match with the argument
  return this.replace(/{([0-9]+)}/g, function (match, index) {
    // check if the argument is present
    return typeof args[index] == "undefined" ? match : args[index];
  });
};

var exports = (module.exports = {});

exports.ins_mem = async function (
  user_id,
  user_password,
  age,
  user_name,
  gender,
  current_weight,
  height,
  goal_weight,
  d_day,
  setting,
  bmr,
  minimum_kcal,
  kcal_per_day,
  profile_path,
  purpose
) {
  const conn = await getConn();
  var ins =
    "INSERT INTO user_table(user_id, user_password, age, user_name, gender, current_weight, height, goal_weight, d_day, setting, bmr, minimum_kcal, kcal_per_day, profile_path, purpose) VALUES('{0}', '{1}', '{2}', '{3}', '{4}', '{5}', '{6}', '{7}', '{8}', '{9}', '{10}', '{11}','{12}','{13}', {14});".format(
      user_id,
      user_password,
      age,
      user_name,
      gender,
      current_weight,
      height,
      goal_weight,
      d_day,
      setting,
      bmr,
      minimum_kcal,
      kcal_per_day,
      profile_path,
      purpose
    );
  let [rows, fields] = await conn.query(ins, []);
  conn.release();
  return "complete";
};
