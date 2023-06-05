var fs = require('fs');
var path = require('path');
var request = require('../utils/request');
var unzip = require('unzipper');
const execSync = require('child_process').execSync;

module.exports = {

  install: function(envName, callback){
    var self = this;
    var res = {
      javaInstalled:false,
      androidInstalled:false
    }
    if(envName != 'android'){
      console.log(" ERROR: ".bgRed, "In this version of mobileui it is only possible to install the environment for android.");
    } else if(process.platform != 'win32') {
      console.log(" ERROR: ".bgRed, "In this version of mobileui it is only possible to install the environment for android in win32.");
    } else if(process.arch != 'x64') {
      console.log(" ERROR: ".bgRed, "In this version of mobileui it is only possible to install the environment for android in x64.");
    } else {
      self.checkAndinstallJava(envName, function(resJava){
        res.javaInstalled = resJava;
        self.checkAndinstallAndroid(envName, function(resAndroid){
          res.androidInstalled = resAndroid;
          callback(res);
        });
      });
      //var javajdk = execSync('node -v');
    }
  },
  checkAndinstallJava: function(envName, callback){
    var self = this;
    var url_java_repo = "https://github.com/MobileUI/java-jdk/raw/master/";
    url_java_repo += process.platform + '/' + process.arch;
    var java_dir = process.env.ProgramFiles;
    var java_folder = 'java';
    if(commands['java-dir']){
      java_dir = commands['java-dir'];
    }
    var path_java = path.join(java_dir, java_folder);
    if(process.env.JAVA_HOME){
      console.log(" OK: ".bgGreen,"Java JDK already installed.");
      callback();
    } else {
      console.log("> Installing Java JDK...".grey)
      try {
        if (!fs.existsSync(path_java)){
            fs.mkdirSync(path_java);
        }
      } catch (e) {
        console.log(" ERROR: ".bgRed, "Java JDK not installed.");
        console.log(e);
      }
      self.downloadZip(url_java_repo, path_java, 'bin.zip', self.errorNotInstalledJava, function(){
        console.log(">> Downloaded bin...".grey);
        self.downloadZip(url_java_repo, path_java, 'db.zip', self.errorNotInstalledJava, function(){
          console.log(">> Downloaded db...".grey);
          self.downloadZip(url_java_repo, path_java, 'include.zip', self.errorNotInstalledJava, function(){
            console.log(">> Downloaded include...".grey);
            self.downloadZip(url_java_repo, path_java, 'jre.zip', self.errorNotInstalledJava, function(){
              console.log(">> Downloaded jre...".grey);
              self.downloadZip(url_java_repo, path_java, 'lib.zip', self.errorNotInstalledJava, function(){
                console.log(">> Downloaded lib...".grey);
                console.log(" SUCCESS: ".bgGreen,"Java JDK installed success, you need set environment variable JAVA_HOME="+path_java)
                callback(true);
              })
            })
          })
        })
      })
    }
  },
  errorNotInstalledJava: function(e){
    console.log(" ERROR: ".bgRed, "Java JDK not installed.");
    console.log(e);
  },
  checkAndinstallAndroid: function(envName, callback){
    var self = this;
    var url_android_repo = "https://github.com/MobileUI/android-sdk/raw/master/";
    url_android_repo += process.platform + '/' + process.arch;
    var android_dir = process.env.ProgramFiles;
    var android_folder = 'android';
    if(commands['android-dir']){
      android_dir = commands['android-dir'];
    }
    var path_android = path.join(android_dir, android_folder);
    if(process.env.ANDROID_HOME){
      console.log(" OK: ".bgGreen,"Android SDK already installed.");
      callback();
    } else {
      console.log("> Installing Android SDK...".grey)
      try {
        if (!fs.existsSync(path_android)){
            fs.mkdirSync(path_android);
        }
      } catch (e) {
        console.log(" ERROR: ".bgRed, "Android SDK not installed.");
        console.log(e);
      }
      self.downloadZip(url_android_repo, path_android, 'build-tools.zip',  self.errorNotInstalledAndroid, function(){
        console.log(">> Downloaded build-tools...".grey);
        self.downloadZip(url_android_repo, path_android, 'extras.zip', self.errorNotInstalledAndroid, function(){
          console.log(">> Downloaded extras...".grey);
          self.downloadZip(url_android_repo, path_android, 'platform-tools.zip', self.errorNotInstalledAndroid, function(){
            console.log(">> Downloaded platform-tools...".grey);
            self.downloadZip(url_android_repo, path_android, 'platforms.zip', self.errorNotInstalledAndroid, function(){
              console.log(">> Downloaded platforms...".grey);
              self.downloadZip(url_android_repo, path_android, 'tools.zip', self.errorNotInstalledAndroid, function(){
                console.log(">> Downloaded tools...".grey);
                console.log(" SUCCESS: ".bgGreen,"Android SDK installed success, you need set environment variable ANDROID_HOME="+path_android)
                callback();
              })
            })
          })
        })
      })
    }
  },
  errorNotInstalledAndroid: function(e){
    console.log(" ERROR: ".bgRed, "Android SDK not installed.");
    console.log(e);
  },
  downloadZip: function(url_repo, path_install, zip, errorNotInstalled, callback){
    var self = this;
    var options = { url: url_repo + '/' + zip, rejectUnauthorized: false, encoding: null };
    request(options, function(err, resp, body) {
      if(err) throw err;
      var fileZip = path.join(path_install, zip);
      fs.writeFile(fileZip, body, function(err) {
        var unzipStream = unzip.Extract({ path: path_install })
        unzipStream.on('error', errorNotInstalled)
        unzipStream.on('close', function () {
          fs.unlinkSync(fileZip)
          callback();
        })
        var readStream = fs.createReadStream(fileZip)
        readStream.pipe(unzipStream)
      });
    });
  }

}
