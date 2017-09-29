/**
 * Created by dl on 2017-09-29.
 */
var Tail = require('always-tail');
var fs = require('fs');
const spawn = require('child_process').spawn;
var config = require('./config');
var moment = require('moment');
console.log(config.port);
global.G = {};


const bat = spawn('cmd.exe', ['/c', 'D:\\project\\BTC\\Windows_N卡星火矿池EWBF_ZEC_Miner_0.3.4b\\miner --server zcash.pool.ethfans.org --user t1ThZu6Kw9hftaTvrupVpcwgXU59ff1E3jt.A1 --pass z --port 3333 --log 2']);
//const bat = spawn('cmd.exe',['/c','start2.bat'])
bat.stdout.on('data', function (stdout) {
    console.log('已经正常启动')
});
bat.stderr.on('data', function (data) {
    console.log('发生了异常:');
});
var filename = "miner.log";

if (!fs.existsSync(filename)) fs.writeFileSync(filename, "");

var tail = new Tail(filename, '\n');

tail.on('line', function (data) {
    var date = moment().format('YYYYMMDDHHmmss');
    var _date = moment().format('YYY-MM-DD HH:mm:ss');
    console.log(_date + '\t' + data);
    if (data.indexOf('Total speed:') == 0) {
        G.totalSpeed = {
            date: date,
            info: data
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
    ;
    console.log(G)
});


tail.on('error', function (data) {
    console.log("error:", data);
});

tail.watch();

setInterval(function () {
    //给服务器反馈一次消息;
    console.log('给服务器发送消息');
}, 10000);

setInterval(function () {
    //从服务器拉取一次消息;
    console.log('从服务器拉取消息');
    const restart = spawn('cmd.exe', ['/c', 'pm2 restart 0']);
    console.log('重启服务器');
    restart.stdout.on('data', function (stdout) {

    });
}, 15000);
