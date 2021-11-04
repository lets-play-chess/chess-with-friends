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

const gameInvList = document.getElementById('game-invite-list');
socket.on('game invite sent', (gameInv) => {
    const newGameInv = document.createElement('li');
    newGameInv.textContent = gameInv.username;
    newGameInv.setAttribute('data-lobbyId', gameInv.lobbyId)

    const acceptGameInvBtn = document.createElement('button');
    // TODO: add a checkmark or something to the 'textConent' of the acceptGameInvBtn
    acceptGameInvBtn.textContent = 'Accept';

    const declineGameInvBtn = document.createElement('button');
    // TODO: add an 'X' or something to the 'textConent' of the acceptGameInvBtn
    declineGameInvBtn.textContent = 'Decline';

    newGameInv.append(acceptGameInvBtn);
    newGameInv.append(declineGameInvBtn);

    gameInvList.append(newGameInv);
});

const friendReqList = document.getElementById('friend-request-list');
// socket.on('friend request sent', (friendReq) => {
//     const newFriendReq = document.createElement('li');
//     newFriendReq.textContent = friendReq.username;
//     newFriendReq.setAttribute('data-userId', friendReq.userId)

//     const acceptFriendReqBtn = document.createElement('button');
//     // TODO: add a checkmark or something to the 'textConent' of the acceptGameInvBtn
//     acceptFriendReqBtn.textContent = 'Accept';

//     const declineFriendReqBtn = document.createElement('button');
//     // TODO: add an 'X' or something to the 'textConent' of the acceptGameInvBtn
//     declineFriendReqBtn.textContent = 'Decline';

//     newFriendReq.append(acceptFriendReqBtn);
//     newFriendReq.append(declineFriendReqBtn);

//     friendReqList.append(newFriendReq);
// });

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
        const accFriendReqBtn = document.querySelectorAll('.acc-friend-req-btn');
        console.log(accFriendReqBtn);
        accFriendReqBtn.forEach(function(btn) {
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
                    socket.emit('friend request accepted', socketObj);
                    location.reload();
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