//Node server which will handle socket IO Connections

const io = require('socket.io')(8000)

const users = {};
io.on('connection', socket => {
    socket.on('new-user-joined', neme => {
        users[socket.id] = neme;
        socket.broadcast.emit('user-joined', neme);
    });
    socket.on('send', message => {
        socket.broadcast.emit('receive', { message: message, neme: users[socket.id] })
    });
    socket.on('disconnect', message => {
        socket.broadcast.emit('left', users[socket.id]);
        delete user[socket.id];
    });
});