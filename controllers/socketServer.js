const { User } = require("../models");

// sockets to listen to connection
exports = module.exports = function (io) {
    io.on('connection', function (socket) {
        io.emit('greeting', 'welcome to our site!');


        socket.on("join game room", joinGameRoom)
        socket.on("join notification room", joinNotiRoom)
        socket.on("send friend request", sendFriendReq)
        socket.on("friend request accepted", friendReqAcc)

        function friendReqAcc(socketObj) {
            const userId = socketObj.userId
            const friendId = socketObj.friendID
            User.findOne({
                where: { id: userId }
            }).then(userData => {
                const friendsList = userData.friends_list;
                friendsList = friendsList.split(' ');
                friendsList.push(' ' + friendId);
                User.update({friend_list: friendsList},{
                    where: { id: userId }
                })
            })
            User.findOne({
                where: { id: friendId }
            }).then(userData => {
                const friendsList = userData.friends_list;
                friendsList = friendsList.split(' ');
                friendsList.push(' ' + userId);
                User.update({friend_list: friendsList},{
                    where: { id: friendId }
                })
            })
        }

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
        function sendFriendReq(socketObj) {
            const newFriendEmail = socketObj.email
            User.findOne({
                where: { email: newFriendEmail }
            }).then(res => {
                const friendID = res.id
                socket.broadcast.to(friendID + "noti").emit("friend request sent", socketObj.id)
            })
        }
    })
}
