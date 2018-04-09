var express = require('express');
var router = express.Router();
const loadjsonconfig = require('../controller/loadjsonconfig');
const Render = require('../controller/render');

// // json处理
// var fs = require('fs');
// var file = "./routes/config.json";
// console.log("读取配置:%s", file)
// var config = JSON.parse(fs.readFileSync(file));

// // console.log(config);
// const __strtemplate = "<a href=\"%s\" class=\"w3-bar-item w3-button\">%s</a>";

// const __strtemplate2 =
//   "<p>" +
//   "<label class=\"w3-text-blue\">" +
//   "<b>%s</b>" +
//   "</label>" +
//   "<input class=\"w3-input w3-border\" name=\"first\" type=\"text\" placeholder=\"%s\">" +
//   "</p>";

// // 格式化
// var util = require("util");
// // var _tempStr = util.format(__strtemplate, "2", "2");

// // console.log("格式化:", _tempStr);

// // _tempStr = "";

// var configStr = new Object();
// configStr._tempStr = "";
// configStr._tempStr2 = "";

// // 遍历
// for (var value in config) {
//   console.log(config[value]);
//   configStr._tempStr += util.format(__strtemplate, config[value].path, config[value].name);

//   for (var i in config[value].talk) {
//     console.log("=====" + config[value].talk[i] + "=====" + i.toString());
//     configStr._tempStr2 += util.format(__strtemplate2, i, config[value].talk[i]);
//     console.log("____" + configStr._tempStr2);
//   }
// }

var _temp = new loadjsonconfig();
configStr = loadjsonconfig.jsonConfig;

/* GET home page. */
router.get('/', function (req, res, next) {
  res.redirect('./sorry/');
});

//选择模板页面
router.get('/:name', function (req, res, next) {
  res.locals.name = req.params.name;
  res.render('index',
    {
      title: configStr[req.params.name].title,
      sidebar_items: configStr.sidebar_items,
      container_items: configStr[req.params.name].container_items
    });
});

//生成模板
router.post('/:name/make', Render.action);

module.exports = router;
