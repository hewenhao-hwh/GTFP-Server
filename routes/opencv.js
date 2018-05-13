const { exec } = require('child_process');
var OpenCVbasePath = 'E:/hwh-workspace/GTFP-Server/OpenCV/';
function Main(imgPath,language){
    const ExePath =  OpenCVbasePath + 'test.exe';
    imgPath = OpenCVbasePath + imgPath;
    var Commond = ExePath + ' ' + imgPath;
    if(language!=''){
      Commond = Commond+' -l '+language;
    }
    console.log(Commond);
    const child = exec(Commond, (error, stdout, stderr) => {
        if (error) {
          throw error;
        }
        console.log(stdout);
      });
}
module.exports = Main ;