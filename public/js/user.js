console.log('hello');
const socket = io.connect();

fetch('/sessions').then(res => {
    if (res.ok) {
        res.json().then(res => {
        console.log(res)
        const gameRoom = res.user.id + "game"
        const notiRoom = res.user.id + "noti"
        socket.emit('join game room', gameRoom)
        socket.emit('join notification room', notiRoom)
        console.log(gameRoom,notiRoom)
    })
    } else {
        // TODO: Show that there was an error and that the friend request wasn't sent
        throw (err)
    }
});

const friendsList = document.getElementById('friends-list');
socket.on('friend request accepted', (newFriend) => {
    const newFriendSocket = document.createElement('li');
    newFriendSocket.textContent = newFriend.username;
    newFriendSocket.setAttribute('data-userId', newFriend.userId);

    friendsList.append(newFriendSocket);
});

// const frs = document.getElementById('frs');
// const notfrs = document.getElementsByClassName('not-frs');
// const openMondalBtn = document.getElementById('open-modal');
// openMondalBtn.addEventListener('click', (event) => {
//     frs.style.display = 'hidden';
//     notfrs.style.display = 'inline';

// });

const playBtn = document.getElementById('play-btn');
playBtn.addEventListener('click', (event) => {
    event.preventDefault();
    console.log('something is happening');
    document.location.replace('/lobby')
});

const addFriendBtn = document.getElementById('add-friend-btn');
addFriendBtn.addEventListener('click', (event) => {
    event.preventDefault();

    const friendEmail = document.getElementById('email-login').value;
    fetch('/sessions').then(res => {
        if (res.ok) {
            res.json().then(res => {
            console.log(res)
            const socketObj = {
                email: friendEmail,
                id: res.user.id
            }
            socket.emit('send friend request', socketObj);
            console.log(socketObj);
            location.reload();
        })
        } else {
            // TODO: Show that there was an error and that the friend request wasn't sent
            throw (err)
        }
    });
});

socket.on("friend request sent", friendReqSent)
function friendReqSent(id){
    const friendReqList = document.getElementById("friend-request-list")
    fetch('/api/users/' + id)
    .then(res => {
        console.log('================')
        console.log(res)
        console.log('================')
        return res.json()

    }).then(res => {
        console.log('================')
        console.log(res)
        console.log('================')
        const username = res.UserData.username
        const newFriendReq = document.createElement("li")
        newFriendReq.setAttribute('class', 'count')
        const friendName = document.createElement("p")
        friendName.textContent = username
        newFriendReq.append(friendName)
        const acceptBtn = document.createElement("button")
        const declineBtn = document.createElement("button")
        acceptBtn.textContent = "Accept"
        acceptBtn.setAttribute('data-id',id)
        acceptBtn.setAttribute('class','acc-friend-req-btn');
        declineBtn.textContent = "Decline"
        newFriendReq.append(acceptBtn)
        newFriendReq.append(declineBtn)
        friendReqList.append(newFriendReq)
        var numfriends = 0;
        var count = document.querySelectorAll('.count')
        count.forEach(element => numfriends++)
        
        const numBadgeEl = document.getElementById("numBadge");
        numBadgeEl.textContent = numfriends;

        const accFriendReqBtn = document.querySelectorAll('.acc-friend-req-btn');
        console.log(accFriendReqBtn);
        accFriendReqBtn.forEach(function(btn) {
            btn.addEventListener("click", (event) => {
                event.preventDefault();
                const friendID = event.target.getAttribute('data-id');
                console.log(event.target.getAttribute('data-id'));
                fetch('/sessions').then(res => {res.json().then(res => {
                    const userId = res.user.id;
                    const userUsername = res.user.username;
                    const friendUsername = username;
                    const socketObj = {
                        userId,
                        userUsername,
                        friendID,
                        friendUsername
                    }
                    socket.emit('friend request accepted', socketObj);
                    location.reload();
                })})
            });
        });
    })
}

socket.on("game invite sent", gameInvSent)
function gameInvSent(id){
    const gameInvList = document.getElementById("game-invite-list")
    fetch('/api/users/' + id)
    .then(res => {
        console.log('================')
        console.log(res)
        console.log('================')
        return res.json()

    }).then(res => {
        console.log('================')
        console.log(res)
        console.log('================')
        const username = res.UserData.username
        const newGameInv = document.createElement("li")
        newGameInv.setAttribute('class', 'count')
        const friendName = document.createElement("p")
        friendName.textContent = username
        newGameInv.append(friendName)
        const acceptBtn = document.createElement("button")
        const declineBtn = document.createElement("button")
        acceptBtn.textContent = "Accept"
        acceptBtn.setAttribute('data-id',id)
        acceptBtn.setAttribute('class','acc-game-invite-btn');
        declineBtn.textContent = "Decline"
        newGameInv.append(acceptBtn)
        newGameInv.append(declineBtn)
        gameInvList.append(newGameInv)
        const accGameInvBtn = document.querySelectorAll('.acc-game-invite-btn');
        console.log(accGameInvBtn);
        accGameInvBtn.forEach(function(btn) {
            btn.addEventListener("click", (event) => {
                event.preventDefault();
                const friendID = event.target.getAttribute('data-id');
                console.log(event.target.getAttribute('data-id'));
                fetch('/sessions').then(res => {res.json().then(res => {
                    const userId = res.user.id;
                    const socketObj = {
                        userId,
                        friendID,
                    }
                    socket.emit('game request accepted', socketObj);
                    document.location.replace('/lobby-guest')
                })})
            });
        });
    })
}


// //fetch (PUT) to replace friendslist with the new list

// const accGameInvBtn = document.getElementsByClassName('acc-game-inv-btn');
// accGameInvBtn.addEventListener('click', (event) => {
//     event.preventDefault();
//     const accGameObj = { something };
//     // TODO: add the correct route to accepting a game invite and set correct method
//     fetch('correct route to accepting a game invite', {
//         method: "POST?",
//         body: JSON.stringify(accGameObj),
//         headers: {
//             "Content-Type": "application/json"
//         }
//     });
// });