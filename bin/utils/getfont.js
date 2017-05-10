var fs = require('fs');
var request = require('request');

var typeFont = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.86 Safari/537.36'

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
  install: function(nameFont){
    var self = this;
    if(nameFont.indexOf('href=') >= 0 || nameFont.indexOf('<link') >= 0){
			nameFont = nameFont.split("href='")[1].split("' rel=")[0];
		} else if (nameFont.indexOf('://') < 0) {
			var urlFormat = "https://fonts.googleapis.com/css?family="+nameFont;
			nameFont = urlFormat;
		}
    var options = {
		    url: nameFont,
        rejectUnauthorized: false,
		    headers: {
		        'User-Agent': typeFont
		    }
		};

    request(options, function (error, response, body) {
      if(response && response.statusCode === 200) {
        self.checkAndDownloadFont(body.toString(), nameFont)
      } else {
		  	if(response.statusCode == 404){
		  		console.log(" ERROR: ".bgRed, "Name of font not found.")
		  	} else {
		  		console.log(" ERROR: ".bgRed, "Could not install font.")
		  	}
        console.log("If you need help see de doc: https://mobileui.github.io/#fonts".grey)
		  }
    });
  },
  checkAndDownloadFont:function(cssString, nameFont){
    var self = this;
    var folder = ''
    if(fs.existsSync("./www")) {
      folder = "/www"
    }
    if (!fs.existsSync("."+folder+"/mobileui")){
        fs.mkdirSync("."+folder+"/mobileui");
    }
    if (!fs.existsSync("."+folder+"/mobileui/fonts")){
        fs.mkdirSync("."+folder+"/mobileui/fonts");
    }
    if(!fs.existsSync("."+folder+"/mobileui/fonts.css")) {
      fs.writeFileSync("."+folder+"/mobileui/fonts.css", '')
    }
    var dirFileFont = '.'+folder+'/mobileui/fonts'
    var nameCssFont = '.'+folder+'/mobileui/fonts.css'

    var f = cssString.split('url(https')[1];
		var link = "https"+f.split(')')[0];
		var n = link.split('/');
		var newLink = n[n.length-1];
		var options = {
		    url: link,
        rejectUnauthorized: false,
		    headers: {
		        'User-Agent': typeFont
		    },
		    encoding: null
		};
		request(options, function (error, response, body) {
		  if (!error && response.statusCode == 200) {
  			fs.writeFile(dirFileFont+"/"+newLink, body, function(err) {
  			    if(err) {
  			        return console.log(err);
  			    }
  			    console.log(" SUCCESS: ".bgGreen,"Font "+newLink+" installed success!")
  			    cssString = cssString.replace(link, "./fonts/"+newLink);
    				if(cssString.indexOf('url(https') < 0){
              fs.writeFile(nameCssFont, cssString, function(err) {
          		    if(err) {
                      console.log(" ERROR: ".bgRed, "Could not install font.")
          		        return console.log(err);
          		    }
                  var msg = "> Create css file: "+nameCssFont;
                  console.log(msg.grey)
          		    self.posScript();
          		});
    				} else {
    					self.checkAndDownloadFont(cssString, nameFont);
    				}
  			});
		  } else {
		  	if(response.statusCode == 404){
		  		console.log("Error get font: URL font source does not exist! ".red);
		  	} else {
		  		console.log("Error get font! ".red);
		  	}
		  }
		});
  },
  posScript: function(){
    var self = this;
    var folder = ''
    if(fs.existsSync("./www")) {
      folder = "/www"
    }
    var indexHtml = './'+folder+'/index.html'
    if (fs.existsSync(indexHtml)) {
      fs.readFile(indexHtml, "utf8", function(err, data) {
        if (err) throw err;
        if(data.indexOf("mobileui/fonts.css") < 0){
        	data = data.replace('<head>','<head>\n    <link rel="stylesheet" type="text/css" href="mobileui/fonts.css">')
	        fs.writeFile(indexHtml, data, function(err) {
				    if(!err) {
              var msg = "> Import of fonts inserted in ."+folder+"/index.html";
              console.log(msg.grey)
				    }
			    });
        }
      });
    }
  }
}
