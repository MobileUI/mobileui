var fs = require('fs');
module.exports = {

  checkIntoProject : function (){
    var result = {isValid:false, msg:""};
    try {
      return fs.lstatSync("./config.xml").isFile() && fs.lstatSync("./www").isDirectory();
    } catch (e) {
      return false;
    }
  }

}
