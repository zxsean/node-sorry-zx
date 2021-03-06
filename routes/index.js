var express = require('express');
var router = express.Router();
const LoadJsonConfig = require('../controller/loadjsonconfig');
const loadjsonconfig = new LoadJsonConfig();
const Render = require('../controller/render');

// 读取
loadjsonconfig.LoadConfig();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.redirect('./sorry/');
});

// 重读配置
router.get('/reloadconfig', function (req, res, next) {
  console.log("重读配置");
  loadjsonconfig.LoadConfig();
  console.log("重读配置完成");
  res.redirect('./sorry/');
})

//选择模板页面
router.get('/:name', function (req, res, next) {
  // 检测斜杠
  if (!req.url.toString().endsWith('/')) {
    // console.log("后缀没斜杠,重定向到有斜杠的__" + req.url + "/__name:" + req.params.name);
    res.redirect(req.url + "/");

    return;
  }

  console.log("页面:" + req.params.name + "_连接ip:" + req.ip);
  // 定义一个临时字典
  var _tempConfig = loadjsonconfig.jsonConfig[req.params.name];

  res.render('index',
    {
      title: _tempConfig.title,
      sidebar_items: loadjsonconfig.jsonConfig.sidebar_items,
      container_items: _tempConfig.container_items,
      name: req.params.name,
      tips: _tempConfig.tips,
    });
});

//生成模板
router.post('/:name/make', Render.action);

module.exports = router;
