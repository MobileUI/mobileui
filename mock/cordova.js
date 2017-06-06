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

navigator.app = {
  exitApp : function(){
    location.reload();
  }
}
