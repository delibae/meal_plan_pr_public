const conn = require("../conn");

const getConn = conn.getConn;

var exports = (module.exports = {});

exports.getToday = async function (user_id, date) {
  const conn = await getConn();
  date = new Date(date);
  var prevDate = date.addDays(-1);
  date = new Date(date).toISOString().split("T")[0];
  prevDate = new Date(prevDate).toISOString().split("T")[0];
  var total_lineDate = [];
  var sqlQuery =
    "select ingredient_table.food_name, ingredient_table.carbo, ingredient_table.protein, ingredient_table.fat, ingredient_table.kcal, user_meal_table.gram, user_meal_table.id " +
    "from user_meal_table left join ingredient_table on user_meal_table.food_code = ingredient_table.food_code " +
    `where user_meal_table.user_id = '${user_id}' AND user_meal_table.date = '${date}';`;
  var [lineData, fields] = await conn.query(sqlQuery, []);
  total_lineDate.push(lineData);
  var sqlQuery =
    "select ingredient_table.food_name, ingredient_table.carbo, ingredient_table.protein, ingredient_table.fat, ingredient_table.kcal, user_meal_table.gram " +
    "from user_meal_table left join ingredient_table on user_meal_table.food_code = ingredient_table.food_code " +
    `where user_meal_table.user_id = '${user_id}' AND user_meal_table.date = '${prevDate}';`;
  var [lineData2, fields] = await conn.query(sqlQuery, []);
  total_lineDate.push(lineData2);

  var sqlQuery = `SELECT * FROM per_day_information_table where user_id = '${user_id}' AND date = '${prevDate}';`;
  var [lineData3, fields] = await conn.query(sqlQuery, []);
  total_lineDate.push(lineData3);

  var sqlQuery =
    "select activity_table.working_time, working_out_table.working_out_code, working_out_table.coefficient " +
    "from activity_table left join working_out_table on working_out_table.working_out_code = activity_table.working_out_code2 " +
    `where activity_table.user_id = '${user_id}' AND activity_table.date = '${date}';`;

  var [lineData4, fields] = await conn.query(sqlQuery, []);
  total_lineDate.push(lineData4);

  conn.release();
  return total_lineDate;
};
