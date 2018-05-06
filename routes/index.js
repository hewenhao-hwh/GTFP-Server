var express = require('express');
var router = express.Router();
var fs = require("fs");
//var formidable = require('formidable');
var multiparty = require('multiparty');
var OpenCV=require('./opencv');
var OpenCVbasePath = './OpenCV';
/* GET home page. */
router.route("/uploadOpenCVPhoto").post(function(req,res){
    // 跨域
    console.log("收到请求");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    
    var form = new multiparty.Form();
    //var form = new formidable.IncomingForm();
    form.encoding = 'utf-8'; // 编码
    form.keepExtensions = true; // 保留扩展名
    form.maxFieldsSize = 2 * 1024 * 1024; // 文件大小
    form.uploadDir = OpenCVbasePath  // 存储路径

    form.parse(req,function(err,fileds,files){ // 解析 formData数据
        //console.log(files);
        if(err){ return console.log(err) }

        var nameArray = files.file[0].originalFilename.split('.');
        var imgType = nameArray[nameArray.length - 1];

        var imgPath = files.file[0].path // 获取文件存储路径
        var new_imgPath=form.uploadDir+'/target.'+imgType;
        fs.renameSync(imgPath,new_imgPath); //把图片名字改为target

        OpenCV('target.'+imgType); //把图片路径给OpenCV模块
        //res.json({code:1})
    });
});
router.route("/downloadOpenCVResultText").get(function(req,res){    // 获取OpenCV结果文字
    
    // 跨域
    console.log("收到请求");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    
    textPath = OpenCVbasePath + "/result.txt";
    fs.readFile(textPath,'utf-8',function(err, data){
        if (err) {
            console.log(err);
            return;
        } else{
            console.log("传出result.txt");
            res.writeHead(200, {'Content-Type':'text/plain'});
            res.write(data);
            res.end();
        }
    });
});

router.route("/downloadOpenCVResultImg").get(function(req,res){    // 获取OpenCV结果图片
    
    // 跨域
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    
    ImgPath = OpenCVbasePath + "/result.jpg";

    fs.readFile(ImgPath,'binary',function(err,  file)  {
        if  (err)  {
            console.log(err);
            return;
        }else{
            console.log("传出result.jpg: ");
            res.writeHead(200,  {'Content-Type':'image/jpeg'});
            res.write(file,'binary');
            res.end();
        }
    });
});
module.exports = router;
