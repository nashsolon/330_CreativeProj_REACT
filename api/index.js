const app = require('express')();
const http = require('http').createServer(app);
const socketio = require('socket.io');

const io = socketio(http, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
});

const data =
{
    rooms: {
        '1234': { users: [] },
        'abcd': { users: [] }
    }
};

const quiz =
{
    questions: {
        1: { q: 'How many days are in a week?', c: '7', i: ['4', '9', '2'] },
        2: { q: 'How many months are in a year?', c: '12', i: ['10', '14', '24'] }
    },

    roomCode: '1234'
};

function joinRoom(room, socket) {
    const ans = Object.keys(data.rooms).includes(room);
    if (ans) {
        console.log(`Someone successfully joined room ${room}`);
        socket.join(room);
        socket.room = room;
        socket.emit("joinRoom", { res: 1, room: room });
    }
    else {
        console.log(room + ' is not valid');
        socket.emit("joinRoom", { res: 0, room: room });
    }
}

function joinWithName(name, room, socket) {
    console.log(`Does room ${room} already include ${name}?`);
    if (Object.keys(data.rooms[room].users).includes(name)) {
        socket.emit('join-with-name', { res: 0, name: name, reason: 'name_taken' });
    }
    else {
        socket.username = name;
        data.rooms[room].users[name] = { score: 0 };
        console.log(data.rooms);
        socket.emit('join-with-name', { res: 1, name: name, reason: 'na' });
    }
}

function rankPlayers(room) {
    const info = data.rooms[room].users;
    console.log("Before:");
    console.log(info);
    const sorted = info.sort((a, b) => {
        // console.log(`${a.score}, ${b.score}`);
        return parseInt(a.score, 10) - parseInt(b.score, 10);
    });
    console.log("Sorted order is:");
    console.log(sorted);
}

io.on('connection', (socket) => {
    console.log("user connected");

    socket.on('joinRoom', (room) => {
        joinRoom(room, socket);
    });
    socket.on('join-with-name', ({ name, room }) => {
        joinWithName(name, room, socket);
    });
    socket.on('userClick', ({ user, ans }) => {
        console.log(`${user} clicked on ${ans}; is it correct?`);
        let points;
        switch (user) {
            case "Nash":
                points = 10;
                break;
            case "Max":
                points = 20;
                break;
            case "Sasha":
                points = 100;
                break;
            default:
                points = 50;
                break;
        }
        if (ans === "C") {
            console.log(`${user} was correct! They earned ${points} points.`);
            data.rooms[socket.room].users[user].score += points;
            // console.log(data.rooms[socket.room]);
        }
        rankPlayers(socket.room);
    });
    socket.on('startGame', (data) => {
        io.to(data.room).emit('startGame');
    });

    socket.on('disconnect', () => {
        if (socket.room) {
            // data.rooms[socket.room].users = data.rooms[socket.room].users.filter((x) => x != socket.username);
            delete data.rooms[socket.room].users[socket.username];
            console.log(`${socket.username} disconnected from ${socket.room}`);
        }
    });
});

http.listen(5000, function () {
    console.log('listening on port 5000');
});
