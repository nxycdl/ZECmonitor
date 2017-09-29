var spawn = require('child_process').spawn;
const bat = spawn('cmd.exe', ['/c', 'aaa.bat']);

var exec = require('child_process').exec;
var iconv = require('iconv-lite');

exec('ping www.sina.com ', {
        encoding: 'binary',
        timeout: 100000,
        maxBuffer: 200 * 1024,
        killSignal: 'SIGTERM',
        cwd: null,
        env: null
    },
    function (error, stdout, stderr) {
        //var str = iconv.decode(stdout, 'GBK');
        console.log(stdout);
    });