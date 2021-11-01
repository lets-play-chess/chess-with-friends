const playBtn = document.getElementById('play-btn');
const notBtn = document.getElementById('notification-btn');

playBtn.addEventListener('click', (event) => {
    event.preventDefault();
    
    // TODO: add the correct route to the lobby page
    fetch('correct route to lobby page',{
        method:"GET"
    });
});

notBtn.addEventListener('click', (event) => {
    event.preventDefault();
    // TODO: open the notifications modal
});