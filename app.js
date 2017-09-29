/**
 * Created by dl on 2017-09-29.
 */
var Tail = require('always-tail');
var fs = require('fs');
const spawn = require('child_process').spawn;
var config = require('./config');
var moment = require('moment');
var ipUtil = require('./Utils/ipUtil');
var http = require('http');
var request = require('request');
global.G = {};
var _cmd=null;



function startCmd() {
    const cmd = config.path + 'miner --server ' + config.minerserver + ' --user ' + config.wallet + '.' + config.name + ' --pass z --port ' + config.minerport + ' --log 2';
    console.log('cmd', cmd);
    const _cmd = spawn('cmd.exe', ['/s', '/c', cmd]);
    //const bat = spawn('cmd.exe',['/c','start2.bat'])
    _cmd.stdout.on('data', function (stdout) {
        console.log('已经正常启动')
    });
    _cmd.stderr.on('data', function (data) {
        console.log('发生了异常:' + data);
    });
}

function stopCmd() {
    _cmd.disconnect();
}

startCmd();
var filename = "miner.log";

if (!fs.existsSync(filename)) fs.writeFileSync(filename, "");

var tail = new Tail(filename, '\n');

tail.on('line', function (data) {
    var date = moment().format('YYYYMMDDHHmmss');
    var _date = moment().format('YYYY-MM-DD HH:mm:ss');
    console.log(_date + '\t' + data);
    if (data.indexOf('Total speed:') == 0) {
        var info = ((data.split('Total speed:')[1]).replace('/\r/g', '')).trim();
        G.totalSpeed = {
            date: date,
            info: info
        }
        var totalSpeed = Number((G.totalSpeed.info.split('Sol/s')[0]).trim());
        console.log('当前总算力:', totalSpeed)
        if (totalSpeed == 0) {
            restartClient();
        }
    }
    if (data.indexOf('Temp: GPU') == 0) {
        G.tempgpu = {
            date: date,
            info: data
        }
    }
    if (data.indexOf('GPU') == 0) {
        G.gpu = {
            date: date,
            info: data
        }
    }
    //console.log(G)
});


tail.on('error', function (data) {
    console.log("error:", data);
});

tail.watch();

setInterval(function () {
    //给服务器反馈一次消息;
    console.log('给服务器发送消息');
    var params = {
        ip: ipUtil.getIPAdress,
        name: config.name,
        info: G
    }
    //sendMessageToServer(params);
}, 10000);

setInterval(function () {
    //从服务器拉取一次消息;
    console.log('从服务器拉取消息');

}, 15000);

function restartClient() {
    const restart = spawn('cmd.exe', ['/c', 'pm2 restart 0']);
    console.log('重启服务器');
    restart.stdout.on('data', function (stdout) {

    });
}

function sendMessageToServer2(params) {
    console.log('xxxx', params);
    var _length = (JSON.stringify(params)).length;
    console.log(_length);
    var post_options = {
        host: 'localhost',
        port: config.postServerPort,
        path: '/yunbi/index/zecmointor',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': _length
        }
    }
    console.log(post_options);
    var post_req = http.request(post_options, function (response) {
        var responseText = ''
        var size = 0;
        response.on('data', function (data) {
            responseText += data;
            size += data.length;
        });
        response.on('end', function () {
            callbackRequest(responseText);
        });
    });
    post_req.write(params + "\n");
    post_req.end();
}
function sendMessageToServer(params) {
    var path = 'yunbi/index/zecmointor';
    request({
        url: "http://127.0.0.1:7001/" + path,
        method: "POST",
        json: true,
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(params)
    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
        }
    });
}

function callbackRequest(responseText) {
    console.log(responseText);

}
