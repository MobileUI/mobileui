var fs = require('fs');
var request = require('../utils/request');

module.exports = {

  install: function(templateName, callback){
    var self = this;
    var folder = ''
    if(fs.existsSync("./www")) {
      folder = "/www"
    }
    var headerRequest = { uri: repoTemplates+templateName+'/template.json', rejectUnauthorized: false }
    request(headerRequest, function (error, response, body) {
      if(response && response.statusCode === 200) {
        var temp = body
        if(temp.files && temp.files.length){
          var totalFiles = temp.files.length;
          var filesDownloaded = 0;
          var download = function(){
            if(temp.files[filesDownloaded].split('/').length > 1){
              var folderDown = temp.files[filesDownloaded].split('/')[0]
              if (!fs.existsSync("."+folder+"/"+folderDown)){
                  fs.mkdirSync("."+folder+"/"+folderDown);
              }
            }
            var msgDown = "> File "+temp.files[filesDownloaded]+" downloaded";
            console.log(msgDown.grey)
            var headerRequest = { uri: repoTemplates+templateName+'/'+temp.files[filesDownloaded], rejectUnauthorized: false }
            request(headerRequest, function (err, response, body) {
              fs.writeFileSync("."+folder+"/"+temp.files[filesDownloaded], response.data);
              filesDownloaded++;
              if(totalFiles === filesDownloaded) {
                callback();
              } else {
                download();
              }

              // response.data.pipe(fs.createWriteStream("."+folder+"/"+temp.files[filesDownloaded]))
              // .on('close', function (err) {
              //   filesDownloaded++;
              //   if(totalFiles === filesDownloaded) {
              //     callback();
              //   } else {
              //     download();
              //   }
              // })

            })
            
          }
          download();
        } else {
          console.log(" ERROR: ".bgRed, "Sorry, this template not ok for now.")
        }
      }
    });
  }

}
