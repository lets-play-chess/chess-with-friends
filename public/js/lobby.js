const socket = io.connect();

const invFriendBtn = document.getElementById('invite-your-friend-btn');
// TODO: somehow figure out how to get the id of the friend you are inviting
invFriendBtn.addEventListener('click', (event) => {
    event.preventDefault();
    console.log('something happened');
    const friendID = document.getElementById('friend-id').value;
    fetch('/sessions').then(res => {
        if(res.ok) {
            res.json().then(res => {
                console.log(res)
                const socketObj = {
                    friendID,
                    id: res.user.id
                }
                socket.emit('send game invite', socketObj);
            })
        } else {
            throw err;
        }
    })
});

const startGameBtn = document.getElementById('start-btn');
// TODO: somehow figure out how to get the lobby id
startGameBtn.addEventListener('click', (event) => {
    event.preventDefault();

});

const backFromLobbyBtn = document.getElementById('back-btn');
// TODO: somehow figure out how to get the lobby id
backFromLobbyBtn.addEventListener('click', (event) => {
    event.preventDefault();

    const backFromLobbyObj = { lobbyId };
    // TODO: add the correct route to start the game in the fetch below
    fetch('correct route to start the game', {
        method: "POST?",
        body:JSON.stringify(backFromLobbyObj),
        headers:{
            "Content-Type":"application/json"
        }
    });
});