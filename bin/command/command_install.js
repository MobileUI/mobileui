var project = require('../utils/project');
var component = require('../utils/component');
var request = require('request');

module.exports = {
    run : function (){
      if(!project.checkIntoProject()) {
        return console.log(" ERROR: ".bgRed, "You are not in the folder of a Cordova project.")
      }
      if(commands._.length < 2) {
        return console.log(" ERROR: ".bgRed, "You must enter the name of the component.")
      }
      var componentName = commands._[1]
      this.install(componentName)
    },
    install: function(componentName){
      var self = this;
      request(repoComponents+componentName+'.json', function (error, response, body) {
        if(response && response.statusCode === 200) {
          var componentJson = JSON.parse(body);
          var installedMessage = component.checkInstalled(componentName)
          if (!commands.update && installedMessage) {
            return console.log(" EXIST: ".bgBlue,"The component ",componentName," has already been installed! If you need reinstall put --update in command.")
          }
          component.install(componentJson, function(err){
            if(err) return console.log(" ERROR: ".bgRed, "Sorry, the component could not be installed at this time.\n",err)
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
                  if(totalDependencies !== totalDownloaded) {
                      installDependency();
                  }
                } else {
                  request(repoComponents+compInstallDepName+'.json', function (error, response, body) {
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
                        if(totalDependencies !== totalDownloaded) {
                            installDependency();
                        }
                      });
                    } else {
                      console.log(" ERROR: ".bgRed, "Component "+ componentJson.dependencies[totalDownloaded]+" not exist.")
                    }
                  });
                }
              }
              installDependency();
            }
          })

        } else {
          console.log(" ERROR: ".bgRed, "Component "+componentName+" not exist.")
        }
      });
    }
}
