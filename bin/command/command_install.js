var project = require('../utils/project');
var component = require('../utils/component');
var getfont = require('../utils/getfont');
var request = require('request');

module.exports = {
    run : function (){
      var self = this;
      // if(!project.checkIntoProject()) {
      //   return console.log(" ERROR: ".bgRed, "You are not in the folder of a Cordova project.")
      // }
      if(commands._.length < 2) {
        return console.log(" ERROR: ".bgRed, "You must enter the name of the component.")
      }
      var indexComponent = 1;
      var componentName = commands._[indexComponent]

      var installComponents = function(){
        if(componentName === 'font') {
          if(commands._.length !== 3){
            console.log(" ERROR: ".bgRed, "To install a font you need to pass the font name after the font command.")
            console.log("If you need help see de doc: https://mobileui.github.io/#fonts".grey)
            return false
          }
          var fontName = commands._[2]
          getfont.install(fontName)
        } else {
          self.install(componentName, function(){
            indexComponent++;
            componentName = commands._[indexComponent]
            if(componentName){
              installComponents();
            }
          })
        }
      }

      installComponents();

    },
    install: function(componentName, callback){
      var self = this;
      var headerRequest = { uri: repoComponents+componentName+'.json', rejectUnauthorized: false }
      request(headerRequest, function (error, response, body) {
        if(response && response.statusCode === 200) {
          var componentJson = JSON.parse(body);
          var installedMessage = component.checkInstalled(componentName)
          if (!commands.update && installedMessage) {
            console.log(" EXIST: ".bgBlue,"The component ",componentName," has already been installed!")
            console.log("If you need reinstall put --update in command.".grey)
            callback()
            return false;
          }
          component.install(componentJson, function(err){
            if(err){
              console.log(" ERROR: ".bgRed, "Sorry, the component could not be installed at this time.\n",err)
              callback()
              return false;
            }
            if(installedMessage) {
              console.log(" SUCCESS: ".bgYellow,"Component "+componentName+" updated success!")
            } else {
              console.log(" SUCCESS: ".bgGreen,"Component "+componentName+" installed success!")
            }
            if(componentJson.dependencies && componentJson.dependencies.length){
              console.log("> Installing dependent components...".grey)
              var totalDependencies = componentJson.dependencies.length;
              var totalDownloaded = 0;
              var installDependency = function(){
                var compInstallDepName = componentJson.dependencies[totalDownloaded]
                var installedMessage = component.checkInstalled(compInstallDepName)
                if (!commands.update && installedMessage) {
                  var msg = "> The component "+compInstallDepName+" has already been installed!"
                  console.log(msg.grey)
                  totalDownloaded++;
                  if(totalDependencies === totalDownloaded) {
                      callback()
                  } else {
                    installDependency();
                  }
                } else {
                  var headerRequest = { uri: repoComponents+compInstallDepName+'.json', rejectUnauthorized: false }
                  request(headerRequest, function (error, response, body) {
                    if(response && response.statusCode === 200) {
                      var componentJsonDep = JSON.parse(body);
                      component.install(componentJsonDep, function(err){
                        if(err) return console.log(" ERROR: ".bgRed, "Sorry, the component could not be installed at this time.\n",err)
                        if(installedMessage) {
                          console.log(" SUCCESS: ".bgYellow,"Component "+ compInstallDepName+" updated success!")
                        } else {
                          console.log(" SUCCESS: ".bgGreen,"Component "+ compInstallDepName+" installed success!")
                        }
                        totalDownloaded++;
                        if(totalDependencies === totalDownloaded) {
                            callback()
                        } else {
                          installDependency();
                        }
                      });
                    } else {
                      console.log(" ERROR: ".bgRed, "Component "+ componentJson.dependencies[totalDownloaded]+" not exist.")
                      totalDownloaded++;
                      if(totalDependencies === totalDownloaded) {
                          callback()
                      } else {
                        installDependency();
                      }
                    }
                  });
                }
              }
              installDependency();
            } else {
              callback();
            }
          })

        } else {
          console.log(" ERROR: ".bgRed, "Component "+componentName+" not exist.")
          callback()
        }
      });
    }
}
