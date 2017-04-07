var canvas = $('#canvas')[0];
var ctx = canvas.getContext('2d');
ctx.strokeStyle = 'lightBlue';
ctx.lineJoin = 'round';
ctx.lineWidth = 5;
var socket = io();


socket.on('draw', function(message) {
    ctx.beginPath();
    ctx.moveTo(message.x, message.y);
    ctx.lineTo(message.x + 1, message.y + 1);
    ctx.closePath();
    ctx.stroke();
});


var mouseState;
$('canvas').on('mousedown', function eventHandler(event) {
    mouseState = true;
});

$('canvas').on('mouseup', function eventHandler(event) {
    mouseState = false;
});

$('canvas').on('mousemove', function eventHandler(event) {
    if (mouseState === true) {
        var drawLine = {
            x: event.clientX,
            y: event.clientY
        };
        socket.emit('draw', drawLine);
    }
});
