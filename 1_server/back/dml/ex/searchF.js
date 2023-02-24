const conn = require("../conn");

const getConn = conn.getConn;

var exports = (module.exports = {});

//프론트에서 음식을 검색할 수 있게 ingredient table에서 food code, food name 가져오기
exports.searchFood = async function () {
  const conn = await getConn();
  var sqlQuery = `SELECT food_code, food_name FROM ingredient_table`;
  let [lineData, fields] = await conn.query(sqlQuery, []);
  conn.release();
  const food_code = lineData.map((item) => item.food_code);
  const food_name = lineData.map((item) => item.food_name);
  return { food_code, food_name };
  // console.log(lineData);
};
