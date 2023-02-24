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

exports.check_login = async function (user_id, user_password) {
  const conn = await getConn();
  var check =
    "SELECT * From user_table where user_id = '{0}' AND user_password='{1}'".format(
      user_id,
      user_password
    );
  let [rows, fields] = await conn.query(check, []);
  conn.release();
  // console.log(rows);
  if (rows.length == 0) {
    return 0;
  } else {
    return rows;
  }
};
