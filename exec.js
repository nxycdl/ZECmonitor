/**
 * Created by dl on 2017-09-29.
 */
const exec = require('child_process').exec;
exec('miner', function(err, stdout, stderr) {
    console.log('x123');
    if (err) {
        console.error(err);
        return;
    }
    console.log(stdout);
});
