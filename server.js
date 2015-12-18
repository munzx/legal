'use strict';

//Dependencies and variables
var express = require('express'),
app = express(),
http = require('http').Server(app),
port = process.env.PORT || 3000,
io = require('socket.io')(http);

//Set default node envoironment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

//Root Path
process.env.PWD = process.cwd();

// Initilize with config file
require('./app/config/init')(app, express);

//initilize feeds , this expects i18n2 to be installed in binded to expressJS
require('./app/helpers/feed.builder.js')(app, io);

//initilize routes
require('./app/config/routes')(app, express);


//Create server in listen on default port if exists or 3000
http.listen(port, function () {
	console.log('Bism Allah , Server runs on port ' + port);
});

