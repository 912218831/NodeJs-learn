var express = require('express');
var sio = require('socket.io');
var app = express.createServer(express.bodyParser(),express.static('public'));
