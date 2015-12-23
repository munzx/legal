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

//initilize feeds , this expects i18n2 to be installed and binded to expressJS (look at the init file)
require('./app/helpers/feed.builder.js')(app, io);

//initilize routes
require('./app/config/routes')(app, express);


//Create server and listen on default port if exists or port 3000 if not
http.listen(port, function () {
	console.log('Bism Allah , Server runs on port ' + port);
});

