const conn = require("../conn");

const getConn = conn.getConn;

var exports = (module.exports = {});

// to do (태희) : 운동기록 페이지에 유저의 오늘 운동 기록 띄워주기 위함
// post맨으로 돌아가는거 확인함 작성날자 : 2023/2/10
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
