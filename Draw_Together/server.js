/*jshint esversion: 6 */
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
app.use(express.static('public'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});



io.on('connection', function(socket) {
    socket.on('draw', function(drawLine) {
        io.emit("draw", drawLine);
    });

    socket.on('disconnect', function() {
        console.log('A user disconnected');
    });
});



http.listen(3000, function() {
    console.log('listening on port 3000');
});
