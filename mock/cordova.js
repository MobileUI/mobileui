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

navigator.accelerometer = {
  getCurrentAcceleration: function(accelerometerSuccess, onError){
    accelerometerSuccess({
      x: 0.01915,
      y: 0.18195,
      z: 10.6972,
      timestamp: new Date().getTime()
    })
  },
  watchAcceleration: function(accelerometerSuccess, onError){
    accelerometerSuccess({
      x: 0.01915,
      y: 0.18195,
      z: 10.6972,
      timestamp: new Date().getTime()
    })
  }
}

navigator.geolocation = {
  getCurrentPosition: function(geolocationSuccess){
    geolocationSuccess({
      coords : {
        latitude : -23.4375745,
        longitude : -51.9125699,
        altitude : 1,
        accuracy : 1,
        altitudeAccuracy : 1,
        heading : 1,
        speed : 1
      },
      timestamp: new Date().getTime()
    })
  }
}

navigator.camera = {
  getPicture: function(cameraSuccess, cameraError, cameraOptions){
    cameraSuccess('iVBORw0KGgoAAAANSUhEUgAAA4QAAAJYCAIAAAC1p7+MAAALZklEQVR4nO3WsQ2CUABFUXVwliJxAkPFBCQ2FnbGDZAF6O9PPGeCV7ziXvdtusCZ3/1dT2BQz+VbT2BQ8+obnHt8XvUEBnWrBwAA8L/EKAAAGTEKAEBGjAIAkBGjAABkxCgAABkxCgBARowCAJARowAAZMQoAAAZMQoAQEaMAgCQEaMAAGTEKAAAGTEKAEBGjAIAkBGjAABkxCgAABkxCgBARowCAJARowAAZMQoAAAZMQoAQEaMAgCQEaMAAGTEKAAAGTEKAEBGjAIAkBGjAABkxCgAABkxCgBARowCAJARowAAZMQoAAAZMQoAQEaMAgCQEaMAAGTEKAAAGTEKAEBGjAIAkBGjAABkxCgAABkxCgBARowCAJARowAAZMQoAAAZMQoAQEaMAgCQEaMAAGTEKAAAGTEKAEBGjAIAkBGjAABkxCgAABkxCgBARowCAJARowAAZMQoAAAZMQoAQEaMAgCQEaMAAGTEKAAAGTEKAEBGjAIAkBGjAABkxCgAABkxCgBARowCAJARowAAZMQoAAAZMQoAQEaMAgCQEaMAAGTEKAAAGTEKAEBGjAIAkBGjAABkxCgAABkxCgBARowCAJARowAAZMQoAAAZMQoAQEaMAgCQEaMAAGTEKAAAGTEKAEBGjAIAkBGjAABkxCgAABkxCgBARowCAJARowAAZMQoAAAZMQoAQEaMAgCQEaMAAGTEKAAAGTEKAEBGjAIAkBGjAABkxCgAABkxCgBARowCAJARowAAZMQoAAAZMQoAQEaMAgCQEaMAAGTEKAAAGTEKAEBGjAIAkBGjAABkxCgAABkxCgBARowCAJARowAAZMQoAAAZMQoAQEaMAgCQEaMAAGTEKAAAGTEKAEBGjAIAkBGjAABkxCgAABkxCgBARowCAJARowAAZMQoAAAZMQoAQEaMAgCQEaMAAGTEKAAAGTEKAEBGjAIAkBGjAABkxCgAABkxCgBARowCAJARowAAZMQoAAAZMQoAQEaMAgCQEaMAAGTEKAAAGTEKAEBGjAIAkBGjAABkxCgAABkxCgBARowCAJARowAAZMQoAAAZMQoAQEaMAgCQEaMAAGTEKAAAGTEKAEBGjAIAkBGjAABkxCgAABkxCgBARowCAJARowAAZMQoAAAZMQoAQEaMAgCQEaMAAGTEKAAAGTEKAEBGjAIAkBGjAABkxCgAABkxCgBARowCAJARowAAZMQoAAAZMQoAQEaMAgCQEaMAAGTEKAAAGTEKAEBGjAIAkBGjAABkxCgAABkxCgBARowCAJARowAAZMQoAAAZMQoAQEaMAgCQEaMAAGTEKAAAGTEKAEBGjAIAkBGjAABkxCgAABkxCgBARowCAJARowAAZMQoAAAZMQoAQEaMAgCQEaMAAGTEKAAAGTEKAEBGjAIAkBGjAABkxCgAABkxCgBARowCAJARowAAZMQoAAAZMQoAQEaMAgCQEaMAAGTEKAAAGTEKAEBGjAIAkBGjAABkxCgAABkxCgBARowCAJARowAAZMQoAAAZMQoAQEaMAgCQEaMAAGTEKAAAGTEKAEBGjAIAkBGjAABkxCgAABkxCgBARowCAJARowAAZMQoAAAZMQoAQEaMAgCQEaMAAGTEKAAAGTEKAEBGjAIAkBGjAABkxCgAABkxCgBARowCAJARowAAZMQoAAAZMQoAQEaMAgCQEaMAAGTEKAAAGTEKAEBGjAIAkBGjAABkxCgAABkxCgBARowCAJARowAAZMQoAAAZMQoAQEaMAgCQEaMAAGTEKAAAGTEKAEBGjAIAkBGjAABkxCgAABkxCgBARowCAJARowAAZMQoAAAZMQoAQEaMAgCQEaMAAGTEKAAAGTEKAEBGjAIAkBGjAABkxCgAABkxCgBARowCAJARowAAZMQoAAAZMQoAQEaMAgCQEaMAAGTEKAAAGTEKAEBGjAIAkBGjAABkxCgAABkxCgBARowCAJARowAAZMQoAAAZMQoAQEaMAgCQEaMAAGTEKAAAGTEKAEBGjAIAkBGjAABkxCgAABkxCgBARowCAJARowAAZMQoAAAZMQoAQEaMAgCQEaMAAGTEKAAAGTEKAEBGjAIAkBGjAABkxCgAABkxCgBARowCAJARowAAZMQoAAAZMQoAQEaMAgCQEaMAAGTEKAAAGTEKAEBGjAIAkBGjAABkxCgAABkxCgBARowCAJARowAAZMQoAAAZMQoAQEaMAgCQEaMAAGTEKAAAGTEKAEBGjAIAkBGjAABkxCgAABkxCgBARowCAJARowAAZMQoAAAZMQoAQEaMAgCQEaMAAGTEKAAAGTEKAEBGjAIAkBGjAABkxCgAABkxCgBARowCAJARowAAZMQoAAAZMQoAQEaMAgCQEaMAAGTEKAAAGTEKAEBGjAIAkBGjAABkxCgAABkxCgBARowCAJARowAAZMQoAAAZMQoAQEaMAgCQEaMAAGTEKAAAGTEKAEBGjAIAkBGjAABkxCgAABkxCgBARowCAJARowAAZMQoAAAZMQoAQEaMAgCQEaMAAGTEKAAAGTEKAEBGjAIAkBGjAABkxCgAABkxCgBARowCAJARowAAZMQoAAAZMQoAQEaMAgCQEaMAAGTEKAAAGTEKAEBGjAIAkBGjAABkxCgAABkxCgBARowCAJARowAAZMQoAAAZMQoAQEaMAgCQEaMAAGTEKAAAGTEKAEBGjAIAkBGjAABkxCgAABkxCgBARowCAJARowAAZMQoAAAZMQoAQEaMAgCQEaMAAGTEKAAAGTEKAEBGjAIAkBGjAABkxCgAABkxCgBARowCAJARowAAZMQoAAAZMQoAQEaMAgCQEaMAAGTEKAAAGTEKAEBGjAIAkBGjAABkxCgAABkxCgBARowCAJARowAAZMQoAAAZMQoAQEaMAgCQEaMAAGTEKAAAGTEKAEBGjAIAkBGjAABkxCgAABkxCgBARowCAJARowAAZMQoAAAZMQoAQEaMAgCQEaMAAGTEKAAAGTEKAEBGjAIAkBGjAABkxCgAABkxCgBARowCAJARowAAZMQoAAAZMQoAQEaMAgCQEaMAAGTEKAAAGTEKAEBGjAIAkBGjAABkxCgAABkxCgBARowCAJARowAAZMQoAAAZMQoAQEaMAgCQEaMAAGTEKAAAGTEKAEBGjAIAkBGjAABkxCgAABkxCgBARowCAJARowAAZMQoAAAZMQoAQEaMAgCQEaMAAGTEKAAAGTEKAEBGjAIAkBGjAABkxCgAABkxCgBARowCAJARowAAZMQoAAAZMQoAQEaMAgCQEaMAAGTEKAAAGTEKAEBGjAIAkBGjAABkxCgAABkxCgBARowCAJARowAAZMQoAAAZMQoAQEaMAgCQEaMAAGTEKAAAGTEKAEBGjAIAkBGjAABkxCgAABkxCgBARowCAJARowAAZMQoAAAZMQoAQEaMAgCQEaMAAGTEKAAAGTEKAEBGjAIAkBGjAABkxCgAABkxCgBARowCAJARowAAZMQoAAAZMQoAQEaMAgCQEaMAAGTEKAAAGTEKAEBGjAIAkBGjAABkxCgAABkxCgBARowCAJARowAAZMQoAAAZMQoAQEaMAgCQEaMAAGTEKAAAGTEKAEBGjAIAkBGjAABkxCgAABkxCgBARowCAJARowAAZMQoAAAZMQoAQEaMAgCQEaMAAGTEKAAAGTEKAEBGjAIAkBGjAABkxCgAABkxCgBARowCAJARowAAZMQoAAAZMQoAQEaMAgCQEaMAAGTEKAAAGTEKAEBGjAIAkBGjAABkxCgAABkxCgBARowCAJARowAAZMQoAAAZMQoAQEaMAgCQEaMAAGTEKAAAGTEKAEBGjAIAkBGjAABkxCgAABkxCgBARowCAJARowAAZMQoAAAZMQoAQOYAiLYRNAFUJvoAAAAASUVORK5CYII=')
  }
}

window.sqlitePlugin = {
  openDatabase : function(p){
    if(!p) p = {};
    if(!p.name) p.name = 'mockdb';
    if(!p.version) p.version = '1.0';
    if(!p.description) p.description = 'MockDB';
    if(!p.size) p.size = -1;
    return window.openDatabase(p.name, p.version, p.description, p.size);
  },
  deleteDatabase: function(p, successcb, errorcb){
    errorcb('This feature only works on the native device. On the web delete your database via settings.')
  }
}

setTimeout(function(){
  var customEvent = new CustomEvent("deviceready",{ "detail": "MOCK"});
  document.dispatchEvent(customEvent);

  var customEventBatteryStatus = new CustomEvent("batterystatus");
  customEventBatteryStatus.level  = 46;
  customEventBatteryStatus.isPlugged  = true;

  window.dispatchEvent(customEventBatteryStatus);
}, 200);
