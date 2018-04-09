var express = require('express');
var router = express.Router();
const loadjsonconfig = require('../controller/loadjsonconfig');
const Render = require('../controller/render');

var _temp = new loadjsonconfig();
configStr = loadjsonconfig.jsonConfig;

/* GET home page. */
router.get('/', function (req, res, next) {
  res.redirect('./sorry/');
});

//选择模板页面
router.get('/:name', function (req, res, next) {
  var _tempConfig = configStr[req.params.name];

  res.render('index',
    {
      title: _tempConfig.title,
      sidebar_items: configStr.sidebar_items,
      container_items: _tempConfig.container_items,
      name: req.params.name,
      tips: _tempConfig.tips,
    });
});

//生成模板
router.post('/:name/make', Render.action);

module.exports = router;
