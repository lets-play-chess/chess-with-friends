const socket = io();
// Game Logic :)))))

// White starts the game (white = 0, black = 1)
let playerTurn = 0;

// Declaring global variables
let selected;

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

    if (user.color === 'w' && 
        justPiece[0] === ('w' || 'empty') ||
        user.color === 'b' &&
        justPiece[0] === ('b' || 'empty'));
    {
        if (user.color === 'w' && playerTurn === 0 ||
            user.color === 'b' && playerTurn === 1)
        {
            switch (justPiece[1]) {
                case '':
                    switch (justPiece[0]) {
                        case 'empty':
                            clearPossibleMoves();
                        break;
        
                        case 'possible':
                            clearPossibleMoves();
                            movePiece(selected,AN);
                        break;
                    }
                break;
        
                case 'Rook':
                    clearPossibleMoves();
                    const rookPossMoves = checkRookPossibleMoves(AN0,AN1);
                    updatePossibleMoves(rookPossMoves);
                    selected = AN;
                break;
        
                case 'Knight':
                    clearPossibleMoves();
                    const knightPossMoves = checkKnightPossibleMoves(AN0,AN1);
                    updatePossibleMoves(knightPossMoves);
                    selected = AN;
                break;
        
                case 'Bishop':
                    clearPossibleMoves();
                    const bishopPossMoves = checkBishopPossibleMoves(AN0,AN1);
                    updatePossibleMoves(bishopPossMoves);
                    selected = AN;
                break;
                
                case 'Queen':
                    clearPossibleMoves();
                    const firstHalfMoves = checkRookPossibleMoves(AN0,AN1);
                    const secondHalfMoves = checkBishopPossibleMoves(AN0,AN1);
                    const queenPossMoves = firstHalfMoves.concat(secondHalfMoves);
                    updatePossibleMoves(queenPossMoves);
                    selected = AN;
                break;
        
                case 'King':
                    clearPossibleMoves();
                    const kingPossMoves = checkKingPossibleMoves(AN0,AN1);
                    updatePossibleMoves(kingPossMoves);
                    selected = AN;
                break;
        
                case 'Pawn':
                    clearPossibleMoves();
                    const pawnPossMoves = checkPawnPossibleMoves(AN0,AN1);
                    updatePossibleMoves(pawnPossMoves);
                    selected = AN;
                break;
            }
        }
    }

});

const checkRookPossibleMoves = (zero,one) => {
    const rookPossibleMoves = [];
    const numAN0 = Number(zero);
    const numAN1 = Number(one);

    // checking possible moves above rook
    const upper = numAN0;
    for (let i = 1; i <= upper; i++) { 
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
    const left = numAN1;
    for (let i = 1; i <= left; i++) {
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
    const below = 8 - (numAN0 + 1);
    for (let i = 1; i <= below; i++) { 
        const checking = numAN0 + i;
        const strChecking = checking.toString();
        strChecking.push(AN1);
        if (seeCurrentPiece(strChecking) === 'empty') {
            rookPossibleMoves.push(strChecking);
        } else {
            break;
        }            
    }

    // checking possible moves right of rook
    const right = 8 - (numAN1 + 1);
    for (let i = 1; i <= right; i++) { 
        const checking = numAN1 + i;
        checking = checking.toString();
        const strChecking = AN0;
        strChecking.push(checking);
        if (seeCurrentPiece(strChecking) === 'empty') {
            rookPossibleMoves.push(strChecking);
        } else {
            break;
        }          
    }
    return rookPossibleMoves;
}

const checkBishopPossibleMoves = (zero,one) => {
    const bishopPossibleMoves = [];
    const numAN0 = Number(zero);
    const numAN1 = Number(one);

    // checking upper right possible moves of bishop
    const upperUR = numAN0;
    const rightUR = 8 - (numAN1 + 1);
    let rightUpper = upperUR;
    if (upperUR > rightUR) {
        rightUpper = rightUR;
    }

    for (let i = 1; i <= rightUpper; i++) {
        const AN0check = numAN0 - i;
        const AN1check = numAN1 + i;
        const strChecking = AN0check.toString();
        strChecking.push(AN1check);
        if (seeCurrentPiece(strChecking) === 'empty') {
            bishopPossibleMoves.push(strChecking);
        } else {
            break;
        }            
    }

    // checking upper left possible moves of bishop
    const upperUL = numAN0;
    const leftUL = numAN1;
    let leftUpper = upperUL;
    if (upperUL > leftUL) {
        leftUpper = leftUL;
    }

    for (let i = 1; i <= leftUpper; i++) {
        const AN0check = numAN0 - i;
        const AN1check = numAN1 - i;
        const strChecking = AN0check.toString();
        strChecking.push(AN1check);
        if (seeCurrentPiece(strChecking) === 'empty') {
            bishopPossibleMoves.push(strChecking);
        } else {
            break;
        }            
    }

    // checking lower left possible moves of bishop
    const lowerLL = 8 - (numAN0 + 1);
    const leftLL = numAN1;
    let leftLower = lowerLL;
    if (lowerLL > leftLL) {
        leftLower = leftLL;
    }

    for (let i = 1; i <= leftLower; i++) {
        const AN0check = numAN0 + i;
        const AN1check = numAN1 - i;
        const strChecking = AN0check.toString();
        strChecking.push(AN1check);
        if (seeCurrentPiece(strChecking) === 'empty') {
            bishopPossibleMoves.push(strChecking);
        } else {
            break;
        }            
    }

    // checking lower right possible moves of bishop
    const lowerLR = 8 - (numAN0 + 1);
    const rightLR = 8 - (numAN1 + 1);
    let rightLower = lowerLR;
    if (lowerLR > rightLR) {
        rightLower = rightLR;
    }

    for (let i = 1; i <= rightLower; i++) {
        const AN0check = numAN0 + i;
        const AN1check = numAN1 + i;
        const strChecking = AN0check.toString();
        strChecking.push(AN1check);
        if (seeCurrentPiece(strChecking) === 'empty') {
            bishopPossibleMoves.push(strChecking);
        } else {
            break;
        }            
    }
    return bishopPossibleMoves;
}

const checkKnightPossibleMoves = (zero,one) => {
    const knightPossibleMoves = [];
    const num0 = Number(zero);
    const num1 = Number(one);
    // checking upper moves for knight
    if (num0 !== 0) {
        if (num1 > 1) {
            // left upper move is up one and left two
            const tile1 = toString(num0 - 1);
            const tile2 = toString(num1 - 2);
            tile1.push(tile2);
            if (seeCurrentPiece(tile1) === 'empty') {
                knightPossibleMoves.push(tile1);
            }
        }
        if (num1 < 6) {
            // right upper move is up one and right two
            const tile1 = toString(num0 - 1);
            const tile2 = toString(num1 + 2);
            tile1.push(tile2);
            if (seeCurrentPiece(tile1) === 'empty') {
                knightPossibleMoves.push(tile1);
            }
        }
    }

    // checking left moves for knight
    if (num1 !== 0) {
        if (num0 > 1) {
            // upper left move is left one and up two
            const tile1 = toString(num0 - 2);
            const tile2 = toString(num1 - 1);
            tile1.push(tile2);
            if (seeCurrentPiece(tile1) === 'empty') {
                knightPossibleMoves.push(tile1);
            }
        }
        if (num0 < 6) {
            // lower left move is left one and down two
            const tile1 = toString(num0 + 2);
            const tile2 = toString(num1 - 1);
            tile1.push(tile2);
            if (seeCurrentPiece(tile1) === 'empty') {
                knightPossibleMoves.push(tile1);
            }
        }
    }
    // checking lower moves for knight
    if (num0 !== 7) {
        if (num1 > 1) {
            // left lower move is down one and left two
            const tile1 = toString(num0 + 1);
            const tile2 = toString(num1 - 2);
            tile1.push(tile2);
            if (seeCurrentPiece(tile1) === 'empty') {
                knightPossibleMoves.push(tile1);
            }
        }
        if (num1 < 6) {
            // right lower move is down one and right two
            const tile1 = toString(num0 + 1);
            const tile2 = toString(num1 + 2);
            tile1.push(tile2);
            if (seeCurrentPiece(tile1) === 'empty') {
                knightPossibleMoves.push(tile1);
            }
        }
    }
    //checking right moves for knight
    if (num1 !== 7) {
        if (num0 > 1) {
            // upper right move is right one and up two
            const tile1 = toString(num0 - 2);
            const tile2 = toString(num1 + 1);
            tile1.push(tile2);
            if (seeCurrentPiece(tile1) === 'empty') {
                knightPossibleMoves.push(tile1);
            }
        }
        if (num0 < 6) {
            // lower right move is right one and down two
            const tile1 = toString(num0 + 2);
            const tile2 = toString(num1 + 1);
            tile1.push(tile2);
            if (seeCurrentPiece(tile1) === 'empty') {
                knightPossibleMoves.push(tile1);
            }
        }
    }
    return knightPossibleMoves;
}

const checkKingPossibleMoves = (zero,one) => {
    const kingPossibleMoves = [];
    const num0 = Number(zero);
    const num1 = Number(one);

    // checking up
    if (num0 !== 0) {
        const check0 = toString(num0 - 1);
        const check1 = toString(num1);
        check0.push(check1);
        if (seeCurrentPiece(check0) === 'empty') {
            kingPossibleMoves.push(check0);
        }
    }

    // checking up left
    if (num0 !== 0 && num1 !== 0) {
        const check0 = toString(num0 - 1);
        const check1 = toString(num1 - 1);
        check0.push(check1);
        if (seeCurrentPiece(check0) === 'empty') {
            kingPossibleMoves.push(check0);
        }
    }

    // checking left
    if (num1 !== 0) {
        const check0 = toString(num0);
        const check1 = toString(num1 - 1);
        check0.push(check1);
        if (seeCurrentPiece(check0) === 'empty') {
            kingPossibleMoves.push(check0);
        }
    }

    // checking down left
    if (num0 !== 7 && num1 !== 0) {
        const check0 = toString(num0 + 1);
        const check1 = toString(num1 - 1);
        check0.push(check1);
        if (seeCurrentPiece(check0) === 'empty') {
            kingPossibleMoves.push(check0);
        }
    }

    // checking down
    if (num0 !== 7) {
        const check0 = toString(num0 + 1);
        const check1 = toString(num1);
        check0.push(check1);
        if (seeCurrentPiece(check0) === 'empty') {
            kingPossibleMoves.push(check0);
        }
    }

    // checking down right
    if (num0 !== 7 && num1 !== 7) {
        const check0 = toString(num0 + 1);
        const check1 = toString(num1 + 1);
        check0.push(check1);
        if (seeCurrentPiece(check0) === 'empty') {
            kingPossibleMoves.push(check0);
        }
    }

    // checking right
    if (num1 !== 7) {
        const check0 = toString(num0);
        const check1 = toString(num1 + 1);
        check0.push(check1);
        if (seeCurrentPiece(check0) === 'empty') {
            kingPossibleMoves.push(check0);
        }
    }

    // checking up right
    if (num0 !== 0 && num1 !== 7) {
        const check0 = toString(num0 - 1);
        const check1 = toString(num1 + 1);
        check0.push(check1);
        if (seeCurrentPiece(check0) === 'empty') {
            kingPossibleMoves.push(check0);
        }
    }
    return kingPossibleMoves;
}

const checkPawnPossibleMoves = (zero,one) => {
    const kingPossibleMoves = [];
    const num0 = Number(zero);
    const num1 = Number(one);

    const check0 = toString(num0 - 1);
    const check1 = toString(num1);
    check0.push(check1);
    if (seeCurrentPiece(check0) === 'empty') {
        kingPossibleMoves.push(check0);
    }
}

// takes in a number of moves and sets the piece equal to "possibleMove"
const updatePossibleMoves = (movesArr) => {
    for (let i = 0; i < movesArr.length; i++) {
        const newPossMove = movesArr[i].split('');
        gameboard[newPossMove[0]][newPossMove[1]].piece = 'possible';
    }
}

const clearPossibleMoves = () => {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if(seeCurrentPiece(`${i}${j}`) === 'possible') {
                gameboard[i][j].piece = 'empty';
            }
        }
    }
}

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