
 // Create server
 var http = require('http');
 
 function responseHandler(req, res){
     res.writeHead(200, {'Content-Type': 'text/plain'});
     res.end('Exam 1\n');
 }

 //create callback
 http.createServer(responseHandler).listen(1337, "127.0.0.1");

 //Generate response
 console.log('Server running at http://127.0.0.1:1337/');
 
 // implement the server in express
 var express = require('express'),
 config = require('./config/config');    
 var app = express();    
 
 require('./config/express')(app, config);
 
 //Get, retrieve and listen for port
 console.log("Creating HTTP server on port: " + config.port);
require('http').createServer(app).listen(config.port, function () {
 console.log("HTTP Server listening on port: " + config.port + ", in " + app.get('env') + " mode");
 }); 

//configure the server path

  var path = require('path'),
  rootPath = path.normalize(__dirname + '/..'),
  env = process.env.NODE_ENV ||'development';
  
  var config = {
  development: {
      root:rootPath,
      app:{ name:'ToDo' },
      port:5000,
  },
  production: {
      root:rootPath,
      app:{ name:'ToDo' },
      port: 80,}
  };
  
  module.exports = config[env];

//Utilize static express
var express = require('express');
module.exports = function (app, config) {
app.use(express.static(config.root + '/exam'));

// exception handling 404
  app.use(function(req,res){
      res.type('text/plan');
      res.status(404);
      res.send('404 Not Found');
  });

// exception handling 500
  app.use(function(err,req,res,next){
      console.error(err.stack);
      res.type('text/plan');
      res.status(500);
      res.send('500 Server Error');

  });
  console.log("starting application");
  };




