// sockets to listen to connection
exports = module.exports = function(io){
    io.on('connection',function(socket){
        console.log('something coool has happened!!!! =========================');
        io.emit('greeting','welcome to our site!');

        socket.on('');
    })
}