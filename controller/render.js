const fs = require('fs')
const md5 = require('md5')
const path = require('path')
const ffmpeg = require('ffmpeg')
const rootPath = path.resolve(__dirname + "/..")
var execSync = require('child_process').execSync;

// 默认大小
const __SIZE = 500;

// 生成对应字幕
function renderAss(templateName, sentences, filename) {
    outputFilePath = "/public/cache/" + filename + ".ass"
    templatePath = rootPath + "/public/templates/" + templateName + "/template.ejs"
    console.log(rootPath)

    var exists = fs.existsSync(templatePath)
    if (exists == false) {
        console.error("文件不存在");
        return "";
    }

    template = fs.readFileSync(templatePath, "utf8") //先读文件  
    renderedAssText = require('ejs').render(template, {
        'sentences': sentences
    })

    // 检测文件夹
    if (!fs.existsSync(rootPath + "/public/cache/")) {
        console.log("文件夹不存在!生成cache文件夹");
        fs.mkdirSync(rootPath + "/public/cache/");
    }

    fs.writeFileSync(rootPath + outputFilePath, renderedAssText)
    return outputFilePath
}

function makeGifWithFfmpeg(templateName, sentences, filename) {
    assPath = renderAss(templateName, sentences, filename)
    gifPath = "./public/cache/" + filename
    videoPath = "./public/templates/" + templateName + "/template.mp4"

    // 使用默认尺寸
    var _size = __SIZE;

    // 动态获取尺寸
    try {
        var process = new ffmpeg(videoPath);
        process.then(function (video) {
            // 视频尺寸和默认尺寸取小
            if (video.metadata.video.resolution.w < __SIZE) {
                _size = video.metadata.video.resolution.w;
            }

            console.log("视频尺寸:" + video.metadata.video.resolution.w);
        }, function (err) {
            console.log('Error: ' + err);
        }).then(function () {
            console.log(assPath, gifPath, videoPath)
            var cmd = "ffmpeg -i " + videoPath + " -r 8 -vf ass=." + assPath + ",scale=" + _size + ":-1 -y " + gifPath
            console.log(cmd);
            try {
                execSync(cmd);
                console.log("生成gif成功")
            } catch (e) {
                console.log(e);
            }
        });
    } catch (e) {
        console.log(e.code);
        console.log(e.msg);
    }
}

function renderGif(templateName, sentences) {
    filename = templateName + "-" + md5(JSON.stringify(sentences)) + ".gif"
    gifPath = rootPath + "/public/cache/" + filename
    var exists = fs.existsSync(rootPath + "/public/cache/" + filename)
    if (exists) {
        return filename
    } else {
        makeGifWithFfmpeg(templateName, sentences, filename)
        return filename
    }
}

class Render {
    action(req, res, next) {
        var name = req.params.name;
        var sentences = req.body;
        var str = "";
        req.on("data", function (dt) {
            str += dt;
        });
        req.on("end", function () {
            console.log(str);
            var sentences = JSON.parse(str);
            var filename = renderGif(name, sentences);
            res.send('<p><a href="/cache/' + filename + '" target="_blank"><p>点击下载</p></a></p>');
        });
    }

}

module.exports = new Render();