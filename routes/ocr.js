const { exec } = require('child_process');
var fs = require('fs');
var OCRbasePath = 'E:/hwh-workspace/GTFP-Server/OCR/';
function Main(imgPath,language){
    const ExePath =  OCRbasePath + 'tesseract.exe';
    imgPath = OCRbasePath + imgPath;
    var Commond = ExePath + ' ' + imgPath + ' stdout';
    if(language!=''){
      Commond = Commond+' -l '+language;
    }
    console.log(Commond);
    const child = exec(Commond, (error, stdout, stderr) => {
      if (error) {
        throw error;
      }
      console.log(stdout);
      fs.writeFile(OCRbasePath+'result.txt', stdout,function (err, data) {
        if (err) {
          return console.error(err);
        }
      });
    });
}
module.exports = Main ;