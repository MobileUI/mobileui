var userAgent = navigator.userAgent || navigator.vendor || window.opera;
var systemDevice = "unknown";

if (/windows phone/i.test(userAgent)) {
    systemDevice = "Windows Phone";
}

if (/android/i.test(userAgent)) {
    systemDevice = "Android";
}

if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    systemDevice = "iOS";
}

window.device = {
  cordova : "6.0.1",
  model : "M001",
  platform : systemDevice,
  uuid : "dd00dd00dd00",
  version : "6.0.1",
  manufacturer : "M002",
  isVirtual : false,
  serial : "00001"
}

window.Connection = {
  UNKNOWN : 'unknown',
  ETHERNET : 'ethernet',
  WIFI : 'wifi',
  CELL_2G : '2G',
  CELL_3G : '3G',
  CELL_4G : '4G',
  CELL : 'cell',
  NONE : 'none'
}

navigator.app = {
  exitApp : function(){
    location.reload();
  }
}

navigator.connection = {
  type: window.Connection.WIFI
}

window.sqlitePlugin = {
  openDatabase : function(p){
    if(!p) p = {};
    if(!p.name) p.name = 'mockdb';
    if(!p.version) p.version = '1.0';
    if(!p.description) p.description = 'MockDB';
    if(!p.size) p.size = -1;
    return window.openDatabase(p.name, p.version, p.description, p.size);
  }
}

var customEvent = new CustomEvent("deviceready",{ "detail": "MOCK"});
document.dispatchEvent(customEvent);
