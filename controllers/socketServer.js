// sockets to listen to connection
exports = module.exports = function (io) {
    io.on('connection', function (socket) {
        io.emit('greeting', 'welcome to our site!');


        socket.on("join game room", joinGameRoom)
        socket.on("join notification room", joinNotiRoom)


        function joinGameRoom(gameRoom) {
            socket.broadcast.to(gameRoom).emit("sendMessage", "SERVER : a user just joined");
            if (gameRoom) {
                socket.join(gameRoom);
                console.log("joined room" + gameRoom);
                //users.filter(foundUser => foundUser.id == socket.id)[0].gameRoom = gameRoom;
            }
        }

        function joinNotiRoom(notiRoom) {

            socket.broadcast.to(notiRoom).emit("sendMessage", "SERVER : a user just joined");
            if (notiRoom) {
                socket.join(notiRoom);
                console.log("joined room" + notiRoom);
                //users.filter(foundUser => foundUser.id == socket.id)[0].notiRoom = notiRoom;
            }
        }
    })
}