const express = require('express'); //importing dependencies through require of node.js
const http = require('http');
const socketio = require('socket.io');
const router = require('./router');//importing and requiring router
const cors = require('cors');//cors
const app = express();
const server = http.createServer(app);//passing app initialized with express

// a built-in node module
const {addUser,removeUser,getUser,getUsersInRoom} = require('./users.js');
const PORT = process.env.PORT || 5000;//port for running server, running on 5000, after deployment its going to require specific port



const io = socketio(server, {
    cors: {
        origin: "*",
    },
});

app.use(cors());
app.use(router);//instance of socketio,passing server to instance

io.on('connect', (socket)=>{ //built in method for client connection on io instance
    console.log('We have a new connection!!!!');//registering the user joining room  
    socket.on('join', ({name, room},callback) =>{
        const {error,user} = addUser({id: socket.id, name, room});
        
        if(error) return callback(error);

        socket.join(user.room);//when no error encountered user is joined in that room
        //emitting events from backend to front end
        socket.emit('message', {user:'admin', text:`${user.name}, welcome to the room ${user.room}`});//emitting a message when any users joins
        socket.broadcast.to(user.room).emit('message',{user:'admin', text: `${user.name},has joined`});//inbuilt method that broadcast which user has joined the chat, besides the one who joined
        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
        callback();
    });
    
    //event for users generered messages
    socket.on('sendMessage',(message, callback)=>{// waiting for send message of user, and this emit wil happen on front end
        let user = getUser(socket.id);//getting user that send the message//emit message from front end
        io.to(user.room).emit('message',{user: user.name, text:message});
        io.to(user.room).emit('roomData',{room: user.room, users: getUsersInRoom(user.room)});
        callback();

    });

    socket.on('disconnect', () =>{ //built in disconect for that particular socket instance where user joined and then left
    const user = removeUser(socket.id);// registering the user leaving
    if(user){
        io.to(user.room).emit('message', {user: 'admin', text: `${user.name} has left.`});
        
    }
    })
});


server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));//to run server, passing parameters to it bn     