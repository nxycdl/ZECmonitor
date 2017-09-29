/**
 * Created by dl on 2017-09-29.
 */
const spawn = require('child_process').spawn;
//const bat = spawn('cmd.exe', ['/c', 'aaa.bat']);
// const bat = spawn('cmd.exe',['/c','start2.bat']);
const exeFile = require('child_process').execFile;
const bat = spawn('cmd.exe', ['/c', 'miner --server zcash.pool.ethfans.org --user t1ThZu6Kw9hftaTvrupVpcwgXU59ff1E3jt.A1 --pass z --port 3333 --log 2']);
//const bat = spawn('miner --server zcash.pool.ethfans.org --user t1ThZu6Kw9hftaTvrupVpcwgXU59ff1E3jt.A1 --pass z --port 3333',['/c']);
//const bat = spawn('miner',['--server','zcash.pool.ethfans.org','--user','t1ThZu6Kw9hftaTvrupVpcwgXU59ff1E3jt.A1','--pass','z','--port','3333']);
//var iconv = require('iconv-lite');


bat.stdout.on('data', function (stdout) {
    console.log('x', stdout);
    //var str = iconv.decode(stdout, 'GBK');
    console.log(stdout.toString());
});

bat.stderr.on('data', function (data) {
    console.log(data.toString());
});

//child.stdout.pipe(dest);
