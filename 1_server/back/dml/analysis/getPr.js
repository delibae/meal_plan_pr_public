const conn = require("../conn");

const getConn = conn.getConn;

var exports = (module.exports = {});

//기간 설정해서 가져오고 평균(prevDate ~ currentdate)
exports.getPeriod = async function (user_id, startDate, endDate) {
  const conn = await getConn();

  //0000-00-00 string으로 맞춰주기 위해 addDays(0) 사용

  // to do 이부분 좀 이상한듯
  startDate = new Date(startDate);

  startDate = startDate.addDays(0);
  endDate = new Date(endDate);
  endDate = endDate.addDays(0);

  var sqlQuery = `SELECT * FROM per_day_information_table where user_id = '${user_id}' AND '${startDate}' <= date AND date <= '${endDate}' order by date ASC;`;
  // console.log(sqlQuery);
  let [lineData, fields] = await conn.query(sqlQuery, []);
  // console.log(lineData)
  conn.release();

  let days = lineData.length;
  let temp = lineData.map((e) => {
    e.date.setHours(e.date.getHours() + 9);
    return { ...e, date: e.date.toString() };
  });
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
