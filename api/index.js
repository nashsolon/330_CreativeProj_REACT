const app = require('express')();
const http = require('http').createServer(app);
const socketio = require('socket.io');
let admin = require("firebase-admin");

// let serviceAccount = require("./serviceAccountKey.json");
let serviceAccount = require("./sasha-firebase.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    // databaseURL: 'https://quiz.firebaseio.com'
    databaseURL: 'https://quiz-game.firebaseio.com'
});
// let app = admin.initializeApp();

const db = admin.firestore();
// console.log(db);
const getQuizByName = async (name) => {
    const quizzes = db.collection('quizzes');
    const snapshot = await quizzes.where('quiz_name', '==', name).get();
    if (snapshot.empty) {
        console.log("uh");
        return;
    }
    snapshot.forEach(doc => {
        console.log(doc.data());
    });
};

const getQuizByCode = async (code) => {
    const quizzes = db.collection('quizzes').doc(code);
    const doc = await quizzes.get();
    if (!doc.exists) {
        console.log(`No quiz found with code ${code}`);
        return;
    }
    return doc.data();
    // console.log(snap[0].data());
    // return snap[0];
};

// getQuizByCode("6891").then(doc => {
//     console.log(doc);
// });

const getQuizzesByCreatorId = async (id) => {
    const quizzes = db.collection('quizzes');
    const snap = await quizzes.where('creatorId', '==', id).get();
    if (snap.empty) {
        console.log('This user has no quizzes!');
        return null;
    }
    let arr = [];
    snap.forEach(doc => {
        let thing = doc.data();
        thing.roomCode = doc.id;
        arr.push(thing);
    });
    return arr;
}

const getRoomCodes = async () => {
    const quizzes = db.collection('quizzes').doc('rooms');
    const doc = await quizzes.get();
    if (!doc.exists) {
        console.log("failed");
        return null;
    }
    else {
        return doc.data().codes;
    }
}

// getQuiz('Basic Facts');
// getQuizzesByCreatorId("i4pArCZaNKcnmUTK4nM2IA0muJ02").then(arr => {
//     if (arr) {
//         for (doc of arr) {
//             console.log(doc);
//         }
//     }
// });

// getRoomCodes().then(arr => {
//     if (arr) {
//         console.log(arr);
//     }
// });

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
        '1111': {
            users: [],
            questions: {
                '1': {
                    i2: '9',
                    i3: '2',
                    q: 'How many days are in a week?',
                    i1: '4',
                    c: '7'
                },
                '2': {
                    i2: '16',
                    i1: '9',
                    i3: '3',
                    c: '12',
                    q: 'How many months are in a year?'
                },
                '3': {
                    i3: 'Mt. Nash',
                    c: 'Mt. Everest',
                    q: "What's the tallest mountain in the world?",
                    i2: 'Mt. Denali',
                    i1: 'K2'
                }
            }
        },
        'abcd': { users: [] }
    }
};

// const quiz =
// {
//     questions: {
//         1: { q: 'How many days are in a week?', c: '7', i: ['4', '9', '2'] },
//         2: { q: 'How many months are in a year?', c: '12', i: ['10', '14', '24'] }
//     },

//     roomCode: '1234'
// };

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

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
        console.log("Name taken");
        socket.emit('join-with-name', { res: 0, name: name, reason: 'name_taken' });
    }
    else {
        socket.username = name;
        console.log("Name available");
        data.rooms[room].users.push({ name: name, score: 0 });
        console.log(data.rooms);
        socket.emit('join-with-name', { res: 1, name: name, reason: 'na' });
        console.log('Here we are')
        console.log(data.rooms[room].users);
        //io.to(room)
        io.emit('playerChange', { players: data.rooms[room].users })
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
        // console.log(`${user} clicked on ${ans}; is it correct?`);
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
        if (ans) {
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
        else {
            console.log(`${user} was incorrect :(`);
        }
        rankPlayers(socket.room);
    });

    socket.on('startGame', ({ code }) => {
        console.log(`Start game: ${code}`);
        // io.to(code)
        let round = '2';
        // { q: 'How many days are in a week?', a: ['7', '4', '9', '2'] }
        let { q, c, i1, i2, i3 } = data.rooms[code].questions[round];
        let temp = [c, i1, i2, i3];
        console.log(temp);
        shuffle(temp);
        console.log(temp);
        let question = { q: q, a: temp, c: temp.indexOf(c) }
        io.emit('startGame', question);
    });
    socket.on('hostGame', (code) => {
        getQuizByCode(code).then(quiz => {
            data.rooms[code] = quiz;
            delete data.rooms[code].roomCode;
            data.rooms[code].users = [];
            data.rooms[code].stats = { round: 1 };
            console.log(data);
        });
    });
    socket.on('getQuizNamesById', async (id) => {
        console.log('get all quizes from this user');
        const quizzes = await getQuizzesByCreatorId(id);
        console.log('User quizzes is ' + quizzes)
        let ans;
        if(quizzes != null){
            ans = quizzes.map((x) => {
                return { name: x.name, code: x.roomCode };
            });
        }
        else{
            ans = [];
        }
        socket.emit('getQuizNamesById', ans);
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
                // displayName: data.signin_user
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

    // socket.once('get_quizzes', (data) => {
    //     getQuizzesById(data.creator).then(arr => {
    //         // for (doc of arr) {
    //         //     console.log(doc);
    //         // }
    //         console.log('You are trying to get your quizzes....')
    //         socket.emit('get_quizzes', { 'quiz_arr': arr })
    //     });


    // });

    socket.on('get_one_quiz', async (code) => {
        console.log('Get quiz at room ' + code);
        const quiz = await getQuizByCode(code);
        socket.emit('get_one_quiz', quiz);
    });

    socket.on('getUsername', (data) => {
        console.log('User id is ' + data.creator)
        admin
            .auth()
            .getUser(data.creator)
            .then((userRecord) => {
                // See the UserRecord reference doc for the contents of userRecord.
                console.log('Successfully fetched user data:' + userRecord);
                socket.emit('getUsername', { user_obj: userRecord })
            })
            .catch((error) => {
                console.log('Error fetching user data:', error);
            });
    })

    socket.on('createQuiz', async (id) => {
        console.log("let's create a quiz!");
        let codes = await getRoomCodes();
        let gen_code = Math.floor(Math.random() * 10000);
        while (codes.includes(gen_code)) {
            gen_code = Math.floor(Math.random() * 10000);
        }
        const rooms = db.collection('quizzes').doc('rooms');
        await rooms.update({ codes: admin.firestore.FieldValue.arrayUnion(gen_code.toString()) });

        const temp = { creatorId: id, name: 'Untitled', questions: [] };
        await db.collection('quizzes').doc(gen_code.toString()).set(temp);

        socket.emit('quizCreated', gen_code.toString());
    });

    socket.on('submit_quiz', async ({ quiz, code }) => {
        const res = await db.collection('quizzes').doc(code).delete();
        await db.collection('quizzes').doc(code).set(quiz);
        socket.emit('quizSaved');
    })

    socket.on('deleteQuiz', async (code) => {
        const res = await db.collection('quizzes').doc(code).delete();
        console.log(`Quiz ${code} succesfully deleted`);
    });



    socket.on('disconnect', () => {
        if (socket.room) {
            data.rooms[socket.room].users = data.rooms[socket.room].users.filter((x) => x.name != socket.username);
            // delete data.rooms[socket.room].users[socket.username];
            console.log(`${socket.username} disconnected from ${socket.room}`);
            io.emit('playerChange', { players: data.rooms[socket.room].users })
        }
    });
});

http.listen(5000, function () {
    console.log('listening on port 5000');
});
