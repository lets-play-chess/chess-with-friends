// TODO: finish the next line of code... it currently isnt grabbing anything on the page
const invFriendBtn = document.getElementById('');
// TODO: somehow figure out how to get the id of the friend you are inviting
invFriendBtn.addEventListener('click', (event) => {
    event.preventDefault();

    const invFriendObj = { friendId };
    // TODO: add the correct route to inviting friend in the fetch below
    fetch('correct route to inviting a friend', {
        method: "POST?",
        body:JSON.stringify(invFriendObj),
        headers:{
            "Content-Type":"application/json"
        }
    });
});

// TODO: finish the next line of code
const startGameBtn = document.getElementById('');
// TODO: somehow figure out how to get the lobby id
startGameBtn.addEventListener('click', (event) => {
    event.preventDefault();

    const startGameObj = { lobbyId };
    // TODO: add the correct route to start the game in the fetch below
    fetch('correct route to start the game', {
        method: "POST?",
        body:JSON.stringify(startGameObj),
        headers:{
            "Content-Type":"application/json"
        }
    });
});

// TODO: finish the next line of code
const backFromLobbyBtn = document.getElementById('');
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