#!/bin/env node
//  OpenShift sample Node application
var app     = require('express')();
var fs      = require('fs');
var config  = require('./config');
var http = require('http').Server(app);
var io = require('socket.io')(http);

var image = '';

app.get('/', function(req, res){
  res.sendfile('index.html');
});

io.on('connection', function(socket){
    socket.emit('image', {image: true, buffer: image});
    
  socket.on('image', function(data){
      console.log(data);
      image = data.buffer;
      console.log(image);
  })
  socket.on('pi_error', function(data){
      console.error("Pi Error: ", data);   
  })
});

http.listen(config.port, config.ip, function(){
  console.log('Server listening');
});