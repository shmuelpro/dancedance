const express = require('express')
const app = express();
var http = require('http').createServer(app);
const io = require('socket.io')(http);
const pad = require('./pad')

app.use(express.static('public'))


io.on('connection', function (socket) {
    console.log('a user connected');

    pad.startPad((state) => {
        socket.emit('direction', state);
    })

});




http.listen(4000, function () {
    console.log('listening on *:4000');
});



