var fs = require('fs');
var request = require('../utils/request');

module.exports = {

  checkInstalled : function (componentName){
    var folder = ''
    var dirCSS = ''
    var dirJS = ''
    var exist = false
    if(fs.existsSync("./www")) {
      folder = "/www"
    }
    if(fs.existsSync("."+folder+"/mobileui/style.css")) {
      dirCSS = "."+folder+"/mobileui/style.css"
    }
    if(fs.existsSync("."+folder+"/mobileui/mobileui.js")) {
      dirJS = "."+folder+"/mobileui/mobileui.js"
    }
    if(!dirCSS && !dirJS) return false;

    if(dirCSS) {
      var file = fs.readFileSync(dirCSS, "utf8");
      if(file.indexOf('component-'+componentName) >= 0){
        exist=true
      }
    }
    if(dirJS) {
      var file = fs.readFileSync(dirJS, "utf8");
      if(file.indexOf('component-'+componentName) >= 0){
        exist=true
      }
    }
    return exist;
  },
  install: function(comp, callback){
    var self = this;
    var css=false;
    var js=false;
    var folder = ''
    if(fs.existsSync("./www")) {
      folder = "/www"
    }
    var headerRequest = { uri: repoComponents+comp.name+'.min.css', rejectUnauthorized: false }
    request(headerRequest, function (error, response, body) {
      if(response && response.statusCode === 200) {
        css=true;
        if (!fs.existsSync("."+folder+"/mobileui")){
            fs.mkdirSync("."+folder+"/mobileui");
        }
        if(!fs.existsSync("."+folder+"/mobileui/style.css")) {
          fs.writeFileSync("."+folder+"/mobileui/style.css", '')
        }

        var style = fs.readFileSync("."+folder+"/mobileui/style.css", "utf8");
        if(style.indexOf(".component-"+comp.name) >= 0) {
          var replace = ".component-"+comp.name + style.split(".component-"+comp.name)[1].split('\n')[0]
          style = style.replace(replace,'')
        }
        if(comp.name === 'base') {
          style = ".component-"+comp.name+"{display:block}"+body+"\n" + style
        } else {
          style += ".component-"+comp.name+"{display:block}"+body+"\n"
        }
        fs.writeFileSync("."+folder+"/mobileui/style.css",style)
        var msg = "> File "+comp.name+".min.css downloaded";
        console.log(msg.grey)
      }
      var headerRequest = { uri: repoComponents+comp.name+'.min.js', rejectUnauthorized: false }
      request(headerRequest, function (error, response, body) {
        if(response && response.statusCode === 200) {
          js=true;
          if (!fs.existsSync("."+folder+"/mobileui")){
              fs.mkdirSync("."+folder+"/mobileui");
          }
          if(!fs.existsSync("."+folder+"/mobileui/mobileui.js")) {
            fs.writeFileSync("."+folder+"/mobileui/mobileui.js", '')
          }

          var filejs = fs.readFileSync("."+folder+"/mobileui/mobileui.js", "utf8");
          if(filejs.indexOf("/*component-"+comp.name+"*/") >= 0) {
            var replace = "/*component-"+comp.name+"*/" + filejs.split("/*component-"+comp.name+"*/")[1].split('\n')[0]
            filejs = filejs.replace(replace,'')
          }
          if(comp.name === 'base') {
            filejs = "/*component-"+comp.name+"*/"+body+"\n" + filejs
          } else {
            filejs += "/*component-"+comp.name+"*/"+body+"\n"
          }
          fs.writeFileSync("."+folder+"/mobileui/mobileui.js",filejs)
          var msg = "> File "+comp.name+".min.js downloaded";
          console.log(msg.grey)
        }
        if(!css && !js) {
          callback('The sources this component not exist.')
        } else {
          var index = fs.readFileSync("."+folder+"/index.html", "utf8")
          var config = "";
          if (fs.existsSync("./config.xml")){
              config = fs.readFileSync("./config.xml", "utf8");
          }
          var changeIndex = false;
          var changeConfig = false;
          if(css && index && index.indexOf('mobileui/style.css') < 0){
            changeIndex=true
            index = index.replace('<head>','<head>\n    <link rel="stylesheet" type="text/css" href="mobileui/style.css">')
          }
          if(js && index && index.indexOf('mobileui/mobileui.js') < 0){
            changeIndex=true
            if(index.indexOf('cordova.js') < 0){
              index = index.replace('</body>','<script type="text/javascript" src="mobileui/mobileui.js"></script>\n  </body>')
            } else {
              index = index.replace('<script type="text/javascript" src="cordova.js"></script>','<script type="text/javascript" src="cordova.js"></script>\n        <script type="text/javascript" src="mobileui/mobileui.js"></script>')
            }
          }
          if(changeIndex) {
            fs.writeFileSync("."+folder+"/index.html",index)
            var msg = "> Import of mobileui inserted in ."+folder+"/index.html";
            console.log(msg.grey)
          }
          if(config && config.indexOf('DisallowOverscroll') < 0){
            changeConfig=true
            config = config.replace('<content src="index.html" />','<content src="index.html" />\n    <preference name="DisallowOverscroll" value="true" />')
          }
          if(changeConfig) {
            fs.writeFileSync("./config.xml",config)
            var msg = "> Config.xml updated to use mobileui.";
            console.log(msg.grey)
          }
          if(comp.files && comp.files.length){
            var totalFiles = comp.files.length;
            var filesDownloaded = 0;
            var download = function(){
              if(comp.files[filesDownloaded].split('/').length > 1){
                var folderDown = comp.files[filesDownloaded].split('/')[0]
                if (!fs.existsSync("."+folder+"/mobileui/"+folderDown)){
                    fs.mkdirSync("."+folder+"/mobileui/"+folderDown);
                }
              }
              var headerRequest = { uri: repoComponents+comp.files[filesDownloaded], rejectUnauthorized: false }
              request(headerRequest, function (err, response, body) {
                fs.writeFileSync("."+folder+"/mobileui/"+comp.files[filesDownloaded], response.data);
                filesDownloaded++;
                if(totalFiles === filesDownloaded) {
                  console.log("> Files dependencies downloaded".grey)
                  callback();
                } else {
                  download();
                }
              })
              
              // .pipe(fs.createWriteStream("."+folder+"/mobileui/"+comp.files[filesDownloaded]))
              // .on('close', function (err) {
              //   filesDownloaded++;
              //   if(totalFiles === filesDownloaded) {
              //     console.log("> Files dependencies downloaded".grey)
              //     callback();
              //   } else {
              //     download();
              //   }
              // })
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
