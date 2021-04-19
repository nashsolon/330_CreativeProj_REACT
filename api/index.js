const express = require('express');
const app = express();
const socketio = require("socket.io")

const port = 5000

app.use(express.static('../client/build'));

app.get("/", (req, res) => {
    res.send("Works")
});

const server = app.listen(port, () => {
    console.log("started")
});

const io = socketio(server);

// io.sockets.on("connection", function (socket) {
//     
// });

io.on('connection', (socket) => {
    console.log("connected to something");

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

    socket.on('disconnect', () => {
        console.log("bye");
    });
});

function canJoin(room) {
    return true;
}