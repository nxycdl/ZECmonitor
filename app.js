/**
 * Created by dl on 2017-09-29.
 */
var Tail = require('always-tail');
var fs = require('fs');
const spawn = require('child_process').spawn;
var config = require('./config');
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
    if (data.indexOf('Total speed:') == 0) {
        console.log(data);
    }
    if (data.indexOf('Temp: GPU') == 0) {
        console.log(data);
    }
    if (data.indexOf('GPU') == 0) {
        console.log(data);
    };
});


tail.on('error', function (data) {
    console.log("error:", data);
});

tail.watch();

setTimeout(function () {

}, 20000);
