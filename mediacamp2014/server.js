var _ = require('underscore');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection', function(socket){
        socket.on('message', function(msg){
            var msgObj = {createdAt: new Date()};
            if(_.isString(msg)){
                    msgObj.username = "Unknown";
                    msgObj.message = msg;
            } else {
                    msgObj = msg;
                    msgObj.createdAt = new Date();
            }
            console.log(msgObj);
            io.emit('message', msgObj);
        });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});