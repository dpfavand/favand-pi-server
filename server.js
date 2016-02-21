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
    console.log('client connected');
    socket.emit('image', {image: true, buffer: image});
        
    socket.on('image', function(data){
        console.log('broadcasting image');
        
        // if we wanted to, we could do some manipulation here...
        
        socket.broadcast.emit('image', data);
    });
    
    socket.on('pi_error', function(data){
        console.error("Pi Error ");   
    });
    
    socket.on('send_update_signal', function(){
        console.log('sending update signal');
        io.emit('pi_update');
    })
});

console.log(config.port);
console.log(config.ip);

http.listen(config.port, config.ip, function(){
  console.log('Server listening');
});