console.log('hello');
const socket = io();

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
socket.on('friend request sent', (friendReq) => {
    const newFriendReq = document.createElement('li');
    newFriendReq.textContent = friendReq.username;
    newFriendReq.setAttribute('data-userId', friendReq.userId)

    const acceptFriendReqBtn = document.createElement('button');
    // TODO: add a checkmark or something to the 'textConent' of the acceptGameInvBtn
    acceptFriendReqBtn.textContent = 'Accept';

    const declineFriendReqBtn = document.createElement('button');
    // TODO: add an 'X' or something to the 'textConent' of the acceptGameInvBtn
    declineFriendReqBtn.textContent = 'Decline';
    
    newFriendReq.append(acceptFriendReqBtn);
    newFriendReq.append(declineFriendReqBtn);
    
    friendReqList.append(newFriendReq);
});

const friendsList = document.getElementById('friends-list');
socket.on('friend request accepted', (newFriend) => {
    const newFriendSocket = document.createElement('li');
    newFriendSocket.textContent = newFriend.username;
    newFriendSocket.setAttribute('data-userId',newFriend.userId);

    friendsList.append(newFriendSocket);
});

const frs = document.getElementById('frs');
const notfrs = document.getElementsByClassName('not-frs');
const openMondalBtn = document.getElementById('open-modal');
openMondalBtn.addEventListener('click', (event) => {
    frs.style.display = 'hidden';
    notfrs.style.display = 'inline';

});

const playBtn = document.getElementById('play-btn');
playBtn.addEventListener('click', (event) => {
    event.preventDefault();
    
    // TODO: add the correct route to the lobby page
    fetch('correct route to lobby page',{
        method:"GET"
    });
});

const addFriendBtn = document.getElementById('add-friend-btn');
addFriendBtn.addEventListener('click', (event) => {
    event.preventDefault();

    const friendEmail = document.getElementById('friend-email').value;
    const addFriendObj = { friendEmail };
    // TODO: add the correct route to adding a friend and set correct method
    fetch('correct route to adding a friend', {
        method: "POST?",
        body:JSON.stringify(addFriendObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
            frs.style.display = 'inline';
            notfrs.style.display = 'hidden';
        } else {
            // TODO: Show that there was an error and that the friend request wasn't sent
        }
    });
});

// TODO: add a socket that will accept the requesterEmail
const accFriendReqBtn = document.getElementsByClassName('acc-friend-req-btn');
accFriendReqBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const requesterObj = { requesterEmail };
    // TODO: add the correct route to accepting a friend request and set correct method
    fetch('correct route to accepting a friend request', {
        method: "POST?",
        body:JSON.stringify(requesterObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
            const newFriend = document.createElement('li');
            // TODO: Pull the username of the friend that was just added from the response
            newFriend.textContent = res.username;
            newFriend.setAttribute('data-userId',res.userId);
            friendsList.append(newFriend);
            // TODO: Send through a socket that the friend request was accepted so that the person who sent the request gets updated in real time
        } else {
            // TODO: Show that there was an error and that the friendship wasnt formed
        }
    });
});

//fetch (PUT) to replace friendslist with the new list

const accGameInvBtn = document.getElementsByClassName('acc-game-inv-btn');
accGameInvBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const accGameObj = { something };
    // TODO: add the correct route to accepting a game invite and set correct method
    fetch('correct route to accepting a game invite', {
        method: "POST?",
        body:JSON.stringify(accGameObj),
        headers:{
            "Content-Type":"application/json"
        }
    });
});