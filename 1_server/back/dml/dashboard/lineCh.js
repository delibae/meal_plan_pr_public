const conn = require("../conn");

const getConn = conn.getConn;

var exports = (module.exports = {});

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
