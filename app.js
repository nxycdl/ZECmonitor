/**
 * Created by dl on 2017-09-30.
 */
var Tail = require('always-tail');
var fs = require('fs');
const exec = require('child_process').exec;
var config = require('./config');
var moment = require('moment');
var ipUtil = require('./Utils/ipUtil');
var http = require('http');
var request = require('request');
global.G = {};