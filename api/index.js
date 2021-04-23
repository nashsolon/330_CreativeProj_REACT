const app = require('express')();
const http = require('http').createServer(app);
const socketio = require('socket.io');
let admin = require("firebase-admin");

let serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://quiz.firebaseio.com'
});
// let app = admin.initializeApp();

const db = admin.firestore();
// console.log(db);
const getQuiz = async (name) => {
    const quizzes = db.collection('quizzes');
    const snapshot = await quizzes.where('name', '==', name).get();
    if (snapshot.empty) {
        console.log("uh");
        return;
    }
    snapshot.forEach(doc => {
        console.log(doc.data());
    });
}

const getQuizzesById = async (id) => {
    const quizzes = db.collection('quizzes');
    const snap = await quizzes.where('creatorId', '==', id).get();
    if (snap.empty) {
        console.log('This user has no quizzes!');
        return;
    }
    let arr = [];
    snap.forEach(doc => {
        arr.push(doc.data());
    });
    return arr;
}

// getQuiz('Basic Facts');
getQuizzesById("1").then(arr => {
    for (doc of arr) {
        console.log(doc);
    }
});

// .then((docs) => {
//     docs.forEach(doc => {
//         console.log(doc.data());
//     });
// });

const io = socketio(http, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
});

let data =
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
    let failure = false;
    for (user of data.rooms[room].users) {
        if (user.name === name) {
            failure = true;
            break;
        }
    }
    if (failure) {
        socket.emit('join-with-name', { res: 0, name: name, reason: 'name_taken' });
    }
    else {
        socket.username = name;
        data.rooms[room].users.push({ name: name, score: 0 });
        console.log(data.rooms);
        socket.emit('join-with-name', { res: 1, name: name, reason: 'na' });
    }
}

function rankPlayers(room) {
    const info = data.rooms[room].users;
    info.sort((a, b) => {
        return b.score - a.score;
    });
    console.log("Sorted order is:");
    console.log(info);
}


io.on('connection', (socket) => {
    console.log("user connected");
    // console.log(firebase);


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
            for (this_user of data.rooms[socket.room].users) {
                if (this_user.name === user) {
                    this_user.score += points;
                    break;
                }
            }
            // data.rooms[socket.room].users[user].score += points;
            // console.log(data.rooms[socket.room]);
        }
        rankPlayers(socket.room);
    });
    socket.on('startGame', ({ code }) => {
        console.log(`Start game: ${code}`);
        io.to(code).emit('startGame');
    });
    socket.on('creatorSignUp', (data) => {
        console.log(data);
        // console.log(db);
        admin
            .auth()
            .createUser({
                email: data.signin_email,
                emailVerified: false,

                password: data.signin_pass,
                displayName: data.signin_user
            })
            .then((userRecord) => {
                // See the UserRecord reference doc for the contents of userRecord.
                let data = { 'signin': true }
                socket.emit('creatorSignUp', data)
                console.log('Successfully created new user:', userRecord.uid);
            })
            .catch((error) => {
                console.log('Error creating new user:', error);
                err_message = error.message;
                socket.emit('creatorSignUp', { 'signin': false, 'err_message': err_message })
            });
    })

    socket.on('submit_quiz', (data) => {
        console.log(data);
        // console.log(db);
        // admin
        //     .auth()
        //     .createUser({
        //         email: data.signin_email,
        //         emailVerified: false,

        //         password: data.signin_pass,
        //         displayName: data.signin_user
        //     })
        //     .then((userRecord) => {
        //         // See the UserRecord reference doc for the contents of userRecord.
        //         let data = {'signin': true} 
        //         socket.emit('creatorSignUp', data)
        //         console.log('Successfully created new user:', userRecord.uid);
        //     })
        //     .catch((error) => {
        //         console.log('Error creating new user:', error);
        //         err_message = error.message;
        //         socket.emit('creatorSignUp', {'signin': false, 'err_message': err_message})
        //     });

    })



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
