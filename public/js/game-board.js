const socket = io();
// Game Logic :)))))

// White starts the game (white = 0, black = 1)
let playerTurn = 0;

// Hard Coding the gameboard
const gameboard = 
[
    [{color:'white',AN:'00',piece:'b Rook'},{color:'black',AN:'01',piece:'b Knight'},{color:'white',AN:'02',piece:'b Bishop'},{color:'black',AN:'03',piece:'b Queen'},{color:'white',AN:'04',piece:'b King'},{color:'black',AN:'05',piece:'b Bishop'},{color:'white',AN:'06',piece:'b Knight'},{color:'black',AN:'07',piece:'b Rook'}],
    [{color:'black',AN:'10',piece:'b Pawn'},{color:'white',AN:'11',piece:'b Pawn'},{color:'black',AN:'12',piece:'b Pawn'},{color:'white',AN:'13',piece:'b Pawn'},{color:'black',AN:'14',piece:'b Pawn'},{color:'white',AN:'15',piece:'b Pawn'},{color:'black',AN:'16',piece:'b Pawn'},{color:'white',AN:'17',piece:'b Pawn'}],
    [{color:'white',AN:'20',piece:'empty'},{color:'black',AN:'21',piece:'empty'},{color:'white',AN:'22',piece:'empty'},{color:'black',AN:'23',piece:'empty'},{color:'white',AN:'24',piece:'empty'},{color:'black',AN:'25',piece:'empty'},{color:'white',AN:'26',piece:'empty'},{color:'black',AN:'27',piece:'empty'}],
    [{color:'black',AN:'30',piece:'empty'},{color:'white',AN:'31',piece:'empty'},{color:'black',AN:'32',piece:'empty'},{color:'white',AN:'33',piece:'empty'},{color:'black',AN:'34',piece:'empty'},{color:'white',AN:'35',piece:'empty'},{color:'black',AN:'36',piece:'empty'},{color:'white',AN:'37',piece:'empty'}],
    [{color:'white',AN:'40',piece:'empty'},{color:'black',AN:'41',piece:'empty'},{color:'white',AN:'42',piece:'empty'},{color:'black',AN:'43',piece:'empty'},{color:'white',AN:'44',piece:'empty'},{color:'black',AN:'45',piece:'empty'},{color:'white',AN:'46',piece:'empty'},{color:'black',AN:'47',piece:'empty'}],
    [{color:'black',AN:'50',piece:'empty'},{color:'white',AN:'51',piece:'empty'},{color:'black',AN:'52',piece:'empty'},{color:'white',AN:'53',piece:'empty'},{color:'black',AN:'54',piece:'empty'},{color:'white',AN:'55',piece:'empty'},{color:'black',AN:'56',piece:'empty'},{color:'white',AN:'57',piece:'empty'}],
    [{color:'white',AN:'60',piece:'w Pawn'},{color:'black',AN:'61',piece:'w Pawn'},{color:'white',AN:'62',piece:'w Pawn'},{color:'black',AN:'63',piece:'w Pawn'},{color:'white',AN:'64',piece:'w Pawn'},{color:'black',AN:'65',piece:'w Pawn'},{color:'white',AN:'66',piece:'w Pawn'},{color:'black',AN:'67',piece:'w Pawn'}],
    [{color:'black',AN:'70',piece:'w Rook'},{color:'white',AN:'71',piece:'w Knight'},{color:'black',AN:'72',piece:'w Bishop'},{color:'white',AN:'73',piece:'w Queen'},{color:'black',AN:'74',piece:'w King'},{color:'white',AN:'75',piece:'w Bishop'},{color:'black',AN:'76',piece:'w Knight'},{color:'white',AN:'77',piece:'w Rook'}],
]; 

const tile = document.getElementsByClassName('tile');
tile.addEventListener('click', (event) => {
    event.stopPropagation();
    event.preventDefault();

    const AN = event.target.getAttribute('data-AN');
    const AN0 = AN.split('')[0];
    const AN1 = AN.split('')[1];

    const curPiece = seeCurrentPiece(AN);
    const justPiece = curPiece.split(' ');

    switch (justPiece[1]) {
        case '':
        break;

        case 'Rook':
            const rookPossibleMoves = [];

            // checking possible moves above rook
            const upper = AN0;
            const numAN0 = Number(AN0);
            for (let i = 1; i <= Number(upper); i++) { 
                const checking = numAN0 - i;
                const strChecking = checking.toString();
                strChecking.push(AN1);
                if (seeCurrentPiece(strChecking) === 'empty') {
                    rookPossibleMoves.push(strChecking);
                } else {
                    break;
                }
            }

            // checking possible moves left of rook
            const left = AN1;
            const numAN1 = Number(AN1);
            for (let i = 1; i <= Number(left); i++) {
                const checking = numAN1 - i;
                checking = checking.toString();
                const strChecking = AN0;
                strChecking.push(checking);
                if (seeCurrentPiece(strChecking) === 'empty') {
                    rookPossibleMoves.push(strChecking);
                } else {
                    break;
                }
            }

            // checking possible moves below rook
            const below = 8 - (AN0 + 1);
            const numBelow = Number(below);
            for (let i = 0; i < numBelow; i++) { 
                const checking = numBelow - i;
                const strChecking = checking.toString();
                strChecking.push(AN1);
                if (seeCurrentPiece(strChecking) === 'empty') {
                    rookPossibleMoves.push(strChecking);
                } else {
                    break;
                }            
            }
            
        break;

        case 'Knight':
        break;

        case 'Bishop':
        break;
        
        case 'Queen':
        break;

        case 'King':
        break;

        case 'Pawn':
        break;
    }
});

// function that accepts moving a piece 'from' a tile 'to' another tile.
const movePiece = (from,to) => {
    const nfrom = from.split('');
    const piece = gameboard[nfrom[0]][nfrom[1]].piece;
    gameboard[nfrom[0]][nfrom[1]].piece = 'empty';

    const nto = to.split('');
    gameboard[nto[0]][nto[1]].piece = piece;

    socket.emit('my piece moved', { from, to, });
    playerTurn = Math.abs(playerTurn -1);
}

// function that accepts a 'tile' that you want to see if there are any pieces on
const seeCurrentPiece = (tile) => {
    const ntile = tile.split('');
    return gameboard[ntile[0]][ntile[1]].piece;
}

// socket that listens for when the opponent moves
socket.on('opponent moved piece', (move) => {
    const nfrom = move.from.split('');
    const piece = gameboard[nfrom[0]][nfrom[1]].piece;
    gameboard[nfrom[0]][nfrom[1]].piece = 'empty';

    const nto = move.to.split('');
    gameboard[nto[0]][nto[1]].piece = piece;
    playerTurn = MATH.abs(playerTurn - 1);
});