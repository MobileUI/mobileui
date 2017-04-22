var fs = require('fs');
var request = require('request');

module.exports = {

  checkInstalled : function (componentName){
    if(!fs.existsSync("./www/mobileui/style.css")) return false;

    var file = fs.readFileSync("./www/mobileui/style.css", "utf8");

    if(file.indexOf('component-'+componentName) < 0){
      return false;
    } else {
      return true;
    }

  },
  install: function(comp, callback){
    var self = this;
    var css=false;
    var js=false;
    request(repoComponents+comp.name+'.min.css', function (error, response, body) {
      if(response && response.statusCode === 200) {
        css=true;
        if (!fs.existsSync("./www/mobileui")){
            fs.mkdirSync("./www/mobileui");
        }
        if(!fs.existsSync("./www/mobileui/style.css")) {
          fs.writeFileSync("./www/mobileui/style.css", '')
        }

        var style = fs.readFileSync("./www/mobileui/style.css", "utf8");
        if(style.indexOf(".component-"+comp.name) >= 0) {
          var replace = ".component-"+comp.name + style.split(".component-"+comp.name)[1].split('\n')[0]
          style = style.replace(replace,'')
        }
        if(comp.name === 'base') {
          style = ".component-"+comp.name+"{display:block}"+body+"\n" + style
        } else {
          style += ".component-"+comp.name+"{display:block}"+body+"\n"
        }
        fs.writeFileSync("./www/mobileui/style.css",style)
        var msg = "> File "+comp.name+".min.css downloaded";
        console.log(msg.grey)
      }
      request(repoComponents+comp.name+'.js', function (error, response, body) {
        if(response && response.statusCode === 200) {
          js=true;
          var fd = fs.openSync("./www/mobileui/mobileui.js", 'w')
          fs.writeSync(fd, "\n/*component-"+comp.name+"*/"+body)
          console.log("> File "+comp.name+'.js'+" downloaded".grey)
        }
        if(!css && !js) {
          callback('The sources this component not exist.')
        } else {
          var index = fs.readFileSync("./www/index.html", "utf8")
          var changeIndex = false;
          if(css && index && index.indexOf('mobileui/style.css') < 0){
            changeIndex=true
            index = index.replace('</head>','    <link rel="stylesheet" type="text/css" href="mobileui/style.css">\n</head>')
          }
          if(js && index && index.indexOf('mobileui/mobileui.js') < 0){
            changeIndex=true
            index = index.replace('<script type="text/javascript" src="cordova.js"></script>','<script type="text/javascript" src="mobileui/mobileui.js"></script>\n<script type="text/javascript" src="cordova.js"></script>')
          }
          if(changeIndex) {
            fs.writeFileSync("./www/index.html",index)
            console.log("> Import of mobileui inserted in ./www/index.html".grey)
          }
          if(comp.files && comp.files.length){
            var totalFiles = comp.files.length;
            var filesDownloaded = 0;
            var download = function(){
              if(comp.files[filesDownloaded].split('/').length > 1){
                var folder = comp.files[filesDownloaded].split('/')[0]
                if (!fs.existsSync("./www/mobileui/"+folder)){
                    fs.mkdirSync("./www/mobileui/"+folder);
                }
              }
              var req = request(repoComponents+comp.files[filesDownloaded])
              .pipe(fs.createWriteStream("./www/mobileui/"+comp.files[filesDownloaded]))
              .on('close', function (err) {
                filesDownloaded++;
                if(totalFiles === filesDownloaded) {
                  console.log("> Files dependencies downloaded".grey)
                  callback();
                } else {
                  download();
                }
              })
            }
            download();
          } else {
              callback()
          }
        }
      });
    });
  }

}
