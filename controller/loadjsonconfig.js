const __strtemplate_sidebar_items = "<a href=\"%s\" class=\"w3-bar-item w3-button\">%s</a>";

const __strtemplate_container_items =
    "<p>" +
    "<label class=\"w3-text-blue\">" +
    "<b>%s</b>" +
    "</label>" +
    "<input class=\"w3-input w3-border\" name=\"first\" type=\"text\" placeholder=\"%s\">" +
    "</p>";

const file = "./public/configs/config.json";

var jsonConfig = new Object();

function loadjsonconfig() {
    // 格式化
    var util = require("util");

    jsonConfig.sidebar_items = "";

    // json处理
    var fs = require('fs');

    console.log("读取配置:%s", file)
    var config = JSON.parse(fs.readFileSync(file));
    // console.log(config);

    // 遍历
    for (var value in config) {
        // 创建边栏
        // console.log(config[value]);
        jsonConfig.sidebar_items += util.format(__strtemplate_sidebar_items, config[value].path, config[value].name);

        // 创建对话
        jsonConfig[value] = new Object();
        jsonConfig[value].container_items = "";

        jsonConfig[value].title = config[value].title;

        for (var i in config[value].talk) {
            // console.log(config[value].talk[i]);
            jsonConfig[value].container_items += util.format(__strtemplate_container_items, i, config[value].talk[i]);
            // console.log(jsonConfig[value].container_items + "___" + value);
        }
    }
    
    console.log("读取配置完成");
}

// 导出
module.exports = loadjsonconfig;
module.exports.jsonConfig = jsonConfig;