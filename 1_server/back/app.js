var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var signupRouter = require("./routes/session/signup.js");
var loginRouter = require("./routes/session/login");
var lineChartRouter = require("./routes/dashboard/lineChart");
const insertPerDayRouter = require("./routes/update_db/insertPerDay.js");
var sessionRouter = require("./routes/session/session.js");
var logoutRouter = require("./routes/session/logout.js");
var profileRouter = require("./routes/all_pages/profile.js");
var todayRouter = require("./routes/all_pages/today.js");
var getPeriodRouter = require("./routes/analysis/getPeriod");
var insertActivityRouter = require("./routes/activity/insertActivity.js");
var searchFoodRouter = require("./routes/ex/searchFood");
var getTodayActivityRouter = require("./routes/activity/getTodayActivity");
var getFoodKcalRouter = require("./routes/ex/getFoodKcal");
var insertFoodRouter = require("./routes/ex/insertFood");
var deleteFoodRouter = require("./routes/ex/deleteFood");
var update_perdayRouter = require("./routes/ex/insertPerDay");

const imgfileRouter = require("./routes/ex/imgFiles");

global.__basedir = __dirname;

const cors = require("cors");

const { insert_per_day, insertPerDay } = require("./dml/sql.js");

var session = require("express-session");
var MySQLStore = require("express-mysql-session")(session);
var options = {
  host: "database-1.coxquhjfqaaq.ap-northeast-1.rds.amazonaws.com",
  user: "admin",
  password: "mealplan85",
  database: "develope2",
  port: 3306,
};

var sessionStore = new MySQLStore(options);

var app = express();
app.set("trust proxy", 1);
var clientDomain = "http://192.168.79.137:30000";
app.use(
  session({
    secret: "develope",
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
  })
);

app.use(
  cors({
    origin: ["http://localhost:3000","http://localhost:30000", "http://192.168.79.137:30000", "http://192.168.146.129:30000"], // 출처 허용 옵션
    origin: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true, // 사용자 인증이 필요한 리소스(쿠키 ..등) 접근
  })
);
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use("/api/signup", signupRouter);
app.use("/api/login", loginRouter);
// check session
app.use("/api/session", sessionRouter);
// logout req
app.use("/api/logout", logoutRouter);

app.use("/api/lineChart", lineChartRouter);
app.use("/api/insertPD", insertPerDayRouter);

app.use("/api/profile", profileRouter);

app.use("/api/today", todayRouter);

app.use("/api/Period", getPeriodRouter);
app.use("/api/insertActivity", insertActivityRouter);
app.use("/api/getTodayActivity", getTodayActivityRouter);
app.use("/api/getFoodKcal", getFoodKcalRouter);
app.use("/api/insertFood",insertFoodRouter);
app.use("/api/deleteFood",deleteFoodRouter);

app.use("/api/searchFood", searchFoodRouter);
app.use("/api/imgs", imgfileRouter);
app.use("/api/updatePerDay",update_perdayRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
