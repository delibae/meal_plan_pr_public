const util = require("util");
const multer = require("multer");
const path = require("path");
// const app = require("../app");
// const maxSize = 2 * 1024 * 1024;
// app.use(multer);
let storage = multer.diskStorage({
    //amazon s3 사용시 destination 변경    
    destination: (req, file, cb) => {
        cb(null, __basedir);
    },
    // filename: (req, file, cb) => {
    //     console.log(file.originalname);
    //     cb(null, file.originalname);
    // }
    filename: function (req, file, cb) {
        //파일명이 중복되지 않도록 시간을 포함해서 자동 설정
        cb(null, "imgfile" + Date.now() + path.extname(file.originalname));
    }
});

let uploadFile = multer({
  storage: storage,
//   limits: { fileSize: maxSize },
}).single("file");

let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;