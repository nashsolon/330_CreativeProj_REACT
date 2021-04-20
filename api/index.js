const app = require('express')();
const http = require('http').createServer(app);
const socketio = require('socket.io');
// const allowedOrigins = "http://localhost:* http://127.0.0.1:*";
// const io = socketio(http, { origins: allowedOrigins });
const io = socketio(http, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
})

const rooms = ['1234', 'abcd'];
function canJoin(room) {
    return rooms.includes(room);
}
io.on('connection', (socket) => {
    console.log("we connected");
    socket.on('message', (message) => {
        console.log("received it! " + message);
        io.emit('message', message);
    });
    socket.on('disconnect', () => {
        console.log("disconnected");
    });
    socket.on('joinRoom', (room) => {
        if (canJoin(room)) {
            console.log("Someone successfully joined room", room);
            socket.emit("joinRoom", 1);
        }
        else {
            console.log(room + ' is not valid');
            socket.emit("joinRoom", 0);
        }
    });
});

http.listen(5000, function () {
    console.log('listening on port 5000');
});
