/**
 * Created by dl on 2017-09-29.
 */
var exec  = require('child_process').exec;
exec ('cd D://project//BTC//Windows_N卡星火矿池EWBF_ZEC_Miner_0.3.4b && D://project//BTC//Windows_N卡星火矿池EWBF_ZEC_Miner_0.3.4b//start.bat' ,function(err,stdout,stderr){
    if (err){
        console.log('err',err);
        return;
    }
    console.log(stdout)
});

