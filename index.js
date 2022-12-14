
var http = require('http')
Cam = require('onvif').Cam;

var CAMERA_HOST = '192.1.13.115',
    USERNAME = 'admin',
    PASSWORD = 'Z12345678z',
    PORT = 80;

new Cam({
    hostname: CAMERA_HOST,
    username: USERNAME,
    password: PASSWORD,
    port: PORT
}, function (err) {
    if (err) {
        console.log('Connection Failed for ' + CAMERA_HOST + ' Port: ' + PORT + ' Username: ' + USERNAME + ' Password: ' + PASSWORD);
        console.log(err, "bu error edi");
        return;
    }
    console.log('CONNECTED');
    this.absoluteMove({
        x: 1
        , y: 1
        , zoom: 1
    });
    this.getStreamUri({ protocol: 'RTSP' }, function (err, stream) {
        http.createServer(function (req, res) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(
                '<html><body>' +
                '<embed type="application/x-vlc-plugin" target="' + stream.uri + '"></embed>' +
                '</boby></html>');
        }).listen(3030);
    });
});