const mysql = require("mysql2/promise");

// ENV
const pool = mysql.createPool({
  host: "",
  user: "",
  password: "",
  database: "",
  connectTimeout: 5000,
  connectionLimit: 50, //default 10
});

const getConn = async () => {
  return await pool.getConnection(async (conn) => conn);
};

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

//date 연산 함수
Date.prototype.addDays = function (days) {
  var d = new Date(this.valueOf());
  d.setDate(d.getDate() + days);
  return (
    d.getFullYear() +
    "-" +
    (d.getMonth() + 1 > 9
      ? (d.getMonth() + 1).toString()
      : "0" + (d.getMonth() + 1)) +
    "-" +
    (d.getDate() > 9 ? d.getDate().toString() : "0" + d.getDate().toString())
  );
};

//db로부터 linechart data(9일)에 쓸 데이터 json으로 불러오기
exports.getNineDays = async function (user_id, date) {
  const conn = await getConn();

  date = new Date(date);
  let currentDate = date.addDays(0);
  let prevDate = date.addDays(-9);

  var sqlQuery = `SELECT * FROM per_day_information_table where user_id = '${user_id}' AND '${prevDate}' <= date AND date <= '${currentDate}' order by date ASC;`;
  // console.log(sqlQuery);
  let [lineData, fields] = await conn.query(sqlQuery, []);
  conn.release();
  // console.log(lineData);
  return lineData;
};

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

//addMonth 함수 정의 (9달치 가져오기에 사용)

Date.prototype.addMonths = function (month) {
  var d = new Date(this.valueOf());
  // console.log(d);
  d.setMonth(d.getMonth() + month);
  // console.log(d);
  return (
    d.getFullYear() +
    "-" +
    (d.getMonth() + 1 > 9
      ? (d.getMonth() + 1).toString()
      : "0" + (d.getMonth() + 1)) +
    "-" +
    (d.getDate() > 9 ? d.getDate().toString() : "0" + d.getDate().toString())
  );
};

//9달치 가져오기
exports.getNineMonth = async function (user_id, date) {
  const conn = await getConn();

  date = new Date(date);
  let currentDate = date.addDays(0);
  let currentMonth = date.addDays(-1 * date.getDate() + 1);
  let date2 = new Date(currentMonth);
  let prevMonth = date2.addMonths(-8);

  var sqlQuery = `SELECT * FROM per_day_information_table where user_id = '${user_id}' AND '${prevMonth}' <= date AND date <= '${currentDate}' order by date ASC;`;
  // console.log(sqlQuery);
  let [lineData, fields] = await conn.query(sqlQuery, []);
  conn.release();

  let monthCount = new Map();
  let sumWeight = new Map();
  let sumKcal = new Map();
  let sumConsume = new Map();
  lineData.map(({ date, weight, lose_kcal, kcal_consume }) => {
    let month = new Date(date).getMonth() + 1;
    monthCount.set(month, (monthCount.get(month) || 0) + 1);
    sumWeight.set(month, (sumWeight.get(month) || 0) + weight);
    sumKcal.set(month, (sumKcal.get(month) || 0) + lose_kcal);
    sumConsume.set(month, (sumConsume.get(month) || 0) + kcal_consume);
  });

  let [avgWeightMonth, avgKcalMonth, avgConsumeMonth] = [
    sumWeight,
    sumKcal,
    sumConsume,
  ].map((avgMap) => {
    let returnObject = Object();

    [...avgMap.entries()].map(([month, sum]) => {
      returnObject[month] = Math.round(sum / monthCount.get(month));
    });

    return returnObject;
  });

  return { avgWeightMonth, avgKcalMonth, avgConsumeMonth };
};

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

//기간 설정해서 가져오고 평균(prevDate ~ currentdate)
exports.getPeriod = async function (user_id, startDate, endDate) {
  const conn = await getConn();

  //0000-00-00 string으로 맞춰주기 위해 addDays(0) 사용

  // to do 이부분 좀 이상한듯
  var startDate = new Date(startDate);


  startDate = startDate.addDays(1)
  var endDate = new Date(endDate);
  endDate = endDate.addDays(1)
  

  var sqlQuery = `SELECT * FROM per_day_information_table where user_id = '${user_id}' AND '${startDate}' <= date AND date <= '${endDate}' order by date ASC;`;
  // console.log(sqlQuery);
  let [lineData, fields] = await conn.query(sqlQuery, []);
  // console.log(lineData)
  conn.release();

  let days = lineData.length;

  const sumWeight = lineData
    .map((item) => item.weight)
    .reduce(function add(sum, currValue) {
      return sum + currValue;
    }, 0);
  const sumKcal = lineData
    .map((item) => item.lose_kcal)
    .reduce(function add(sum, currValue) {
      return sum + currValue;
    }, 0);
  const sumConsume = lineData
    .map((item) => item.kcal_consume)
    .reduce(function add(sum, currValue) {
      return sum + currValue;
    }, 0);

  var avgWeight = sumWeight / days;
  var avgKcal = sumKcal / days;
  var avgConsume = sumConsume / days;
  return { lineData, avgWeight, avgKcal, avgConsume };
};

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

//파일을 express router로 입력받고 model router로 업로드


// to do (태희) : 운동기록 페이지에 유저의 오늘 운동 기록 띄워주기 위함
// post맨으로 돌아가는거 확인함 작성날자 : 2023/2/10
// 사용자의오늘 운동, 시간 반환
exports.getTodayActivity = async function (
  user_id,
  date
  
) {
  const conn = await getConn();
  var ins = `select working_out_code2, working_time from activity_table where user_id='${user_id}' and date = '${date}'`;

  let [rows, fields] = await conn.query(ins, []);
  conn.release();
  return rows;
};

// to do(형진) :  해당 음식의 gram당 칼로리를 반환
exports.getKcalpergram = async function (food) {
  const conn = await getConn();
  let cnt = 0;
  let kcal = [];
  for (cnt; cnt < food.length; cnt++) {
    let sqlQuery = `SELECT kcal FROM ingredient_table where food_name='${food[cnt]}'`;
    var [lineData, fields] = await conn.query(sqlQuery, []);
    kcal.push(lineData[0].kcal);
  }
  conn.release();
  return kcal;
};
// 2/14/2023 15:52 음식 등록
exports.ins_food = async function (
  user_id,
  food_name,
  date,
  gram,
) {
  const conn = await getConn();
  
  var temp = `select food_code from ingredient_table where food_name = '${food_name}'`;
  let [temp_rows, temp_fields] = await conn.query(temp, []);
  f_c=temp_rows[0]['food_code'];

  var ins = `INSERT INTO user_meal_table (user_id,food_code,food_name,date,gram) VALUES('${user_id}',${f_c},'${food_name}','${date}',${gram});`;

  let [rows, fields] = await conn.query(ins, []);
  conn.release();
  return rows;
};

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

// per_day_information_table 업데이트
exports.update_perday = async function (
  user_id, 
  date,
  weight,
  losekcal,
  consumekcal
) {
  const conn = await getConn();
  
  var temp = `SELECT * FROM per_day_information_table where user_id='${user_id}' and date='${date}';`
  
  let [temp_rows, temp_fields] = await conn.query(temp, []);
  f_c=temp_rows[0];
  console.log("f_c",f_c);
  if(f_c===undefined){
      console.log("오늘 기록 없음");
      var ins = `INSERT INTO per_day_information_table (user_id,weight,lose_kcal,kcal_consume,date) VALUES('${user_id}',${weight},${losekcal},${consumekcal},'${date}');`;
  }else{
      var ins = `UPDATE per_day_information_table SET weight=${weight}, lose_kcal=${losekcal}, kcal_consume=${consumekcal} WHERE user_id='${user_id}' and date='${date}';`
  }
  
 
  let [rows, fields] = await conn.query(ins, []);
  conn.release();
  return rows;
};
