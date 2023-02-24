const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  // ENV
  host: "",
  user: "",
  password: "",
  database: "",
  connectTimeout: 5000,
  connectionLimit: 50, //default 10
});

var exports = (module.exports = {});

exports.getConn = async () => {
  return await pool.getConnection(async (conn) => conn);
};
