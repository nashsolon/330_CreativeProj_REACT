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
});

const data =
{
    rooms: {
        '1234': [],
        'abcd': []
    }
};

function joinRoom(room, socket) {
    const ans = Object.keys(data.rooms).includes(room);
    if (ans) {
        console.log("Someone successfully joined room", room);
        socket.join(room);
        socket.emit("joinRoom", { res: 1, room: room });
    }
    else {
        console.log(room + ' is not valid');
        socket.emit("joinRoom", { res: 0, room: room });
    }
}

function joinWithName(name, room, socket) {
    console.log('Does room ' + room + ' include ' + name + '?');
    if (data.rooms[room].includes(name)) {
        socket.emit('join-with-name', { res: 0, reason: 'name_taken' });
    }
    else {
        data.rooms[room].push(name);
        console.log(data.rooms);
        socket.emit('join-with-name', { res: 1, reason: 'na' });
    }
}

io.on('connection', (socket) => {
    console.log("we connected");
    socket.on('disconnect', () => {
        console.log("disconnected");
    });
    socket.on('joinRoom', (room) => {
        joinRoom(room, socket);
    });
    socket.on('join-with-name', (data) => {
        joinWithName(data.name, data.room, socket);
    });
});

http.listen(5000, function () {
    console.log('listening on port 5000');
});
