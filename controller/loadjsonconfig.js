// 格式化
const util = require("util");
const fs = require('fs');

const __strtemplate_sidebar_items = "<a href=\"%s\" class=\"w3-bar-item w3-button\">%s</a>";

const __strtemplate_container_items =
    "<p>" +
    "<label class=\"w3-text-blue\">" +
    "<b>%s</b>" +
    "</label>" +
    "<input class=\"w3-input w3-border\" name=\"first\" type=\"text\" placeholder=\"%s\">" +
    "</p>";

const file = "./public/configs/config.json";

// 读取Json配置
function LoadJsonConfig() {
    // 定义配置
    this.jsonConfig = new Object();

    // 重读配置
    this.LoadConfig = function () {
        jsonConfig = new Object();
        jsonConfig.sidebar_items = "";

        // json处理
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
            jsonConfig[value].tips = config[value].tips;

            for (var i in config[value].talk) {
                // console.log(config[value].talk[i]);
                jsonConfig[value].container_items += util.format(__strtemplate_container_items, i, config[value].talk[i]);
                // console.log(jsonConfig[value].container_items + "___" + value);
            }
        }

        this.jsonConfig = jsonConfig;

        console.log("读取配置完成");
    }
}

// 导出
module.exports = LoadJsonConfig;