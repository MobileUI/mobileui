var fs = require('fs');
var project = require('../utils/project');
var component = require('../utils/component');
var finalhandler = require('finalhandler');
var http = require('http');
var serveStatic = require('serve-static');

var DEFAULT_HTTP_PORT = 8080;
var folder = ''
if(fs.existsSync("./www")) {
  folder = "www/"
}
var serve = serveStatic('./'+folder, {'index': ['index.html', 'index.htm']});
var mockCordvaJS = ''
mockCordvaJS += 'var socket = io(location.origin);'
mockCordvaJS += 'socket.on("reload", function (data) { ';
mockCordvaJS += '   location.reload(); ';
mockCordvaJS += '})'

module.exports = {
  run : function (){
    var self = this;
    if(commands.port) {
      DEFAULT_HTTP_PORT = commands.port
    }
    var server = http.createServer(function onRequest (req, res) {
      //console.log(req.url)
      if(req.url === '/cordova.js'){
        res.write(mockCordvaJS);
        res.end();
      } else if(req.url === '/favicon.ico'){
        res.write('');
        res.end();
      } else if(req.url === '/' || req.url === '/index.html'){
        var done = finalhandler(req, res)
        fs.readFile('./'+folder+'index.html', function (err, buf) {
          if (err) return done(err)
          res.setHeader('Content-Type', 'text/html')
          var html = buf.toString();
          html = html.replace('</head>','<script src="/socket.io/socket.io.js"></script><script  type="text/javascript" src="https://rawgit.com/MobileUI/mobileui/master/mock/cordova.js"></script></head>');
          res.end(html)
        })
      } else {
        serve(req, res, finalhandler(req, res))
      }
    });
    server.listen(DEFAULT_HTTP_PORT, function(a){
      console.log(" RUNNING: ".bgGreen,"Server for preview app running on http://localhost:"+DEFAULT_HTTP_PORT);
      console.log("For stop this server hit Ctrl+C.".grey)
    });

    var io = require('socket.io')(server);
    io.on('connection', function (socket) {

    });
    require('chokidar').watch('./'+folder, {ignored: /[\/\\]\./}).on('all', function(event, path) {
      io.sockets.emit('reload', { event: event, path:path });
    });
  }
}
