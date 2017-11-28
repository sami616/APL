const express = require('express');
const path = require('path');

let server = express();
server.use(express.static(__dirname + '/../build'));

server.listen(3007);