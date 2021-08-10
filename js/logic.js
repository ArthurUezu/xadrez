const size = 8;
let gameTurn = 0;
let roundText = document.getElementById("turno");
let i,j;
// creating a matrix of 8 by 8
let aux = document.getElementsByClassName("tile");
let board = [];
for(i=0;i<size;i++){
    board[i] = new Array();
    for(j=0;j<size;j++){
        board[i][j] = aux[i*size+j];
        board[i][j].addEventListener("click",selectPiece);
    }
}

function selectPiece(event){
    let pieceToMove = document.getElementById("pieceToMove");
    if(pieceToMove != null && event.target.classList.contains("possibleMove")){
        // this just prevents the reset of the black tile to turning white
        if(event.target.classList.contains("odd")){
            event.target.className ="odd "+pieceToMove.className;
        }else{
            event.target.className = pieceToMove.className;
            event.target.classList.remove("odd");
        }
        resetTile(pieceToMove);
        nextTurn(); 
    }else{
        if(pieceToMove!=null){
            pieceToMove.id = "";
            resetPossibleMoves();
        }
        else if(gameTurn%2 == 0 && event.target.classList.contains("white")){
            event.target.id = "pieceToMove";
            displayPossibleMoves(event.target);
        }
        else if(gameTurn%2 == 1 && event.target.classList.contains("black")){
            event.target.id = "pieceToMove";
            displayPossibleMoves(event.target);

        }
    }
}

function resetTile(tile){
    // function resets the class names and id's used
    if(tile.classList.contains("odd")){
        tile.className = "tile odd";
    }
    else{
        tile.className = "tile";
    }
    tile.id = "";
    resetPossibleMoves();
}

function resetPossibleMoves(){
    aux = document.getElementsByClassName("possibleMove");
    for(i=0;i<size;i++){
        for(j=0;j<size;j++){
            board[i][j].classList.remove("possibleMove");
        }
    }
}

function nextTurn(){
    gameTurn++;
    if(gameTurn%2 == 0){
        roundText.innerText = "White";
    }
    else{
        roundText.innerText = "Black";
    }
}

function displayPossibleMoves(piece){
    const posY = (piece.offsetTop-16)/80;
    const posX = board[posY].indexOf(piece);
    if(piece.classList.contains("pawn")){
        pawnPath(posX,posY);
    }
    else if(piece.classList.contains("bishop")){
        bishopPath(posX,posY);
    }
    else if(piece.classList.contains("horse")){
        horsePath(posX,posY);
    }
    else if(piece.classList.contains("tower")){
        towerPath(posX,posY);
    }
    else if(piece.classList.contains("queen")){
        towerPath(posX,posY);
        bishopPath(posX,posY);
    }
    else{
        kingPath(posX,posY);
    }
}

function bishopPath(posX,posY){
    for(i=1;i<=size;i++){
        try{
            board[posY+i][posX+i].classList.add("possibleMove");
        }catch(err){}
        try{
            board[posY+i][posX-i].classList.add("possibleMove");
        }catch(err){}
        try{
            board[posY-i][posX-i].classList.add("possibleMove");
        }catch(err){}
        try{
            board[posY-i][posX+i].classList.add("possibleMove");
        }catch(err){}
    }
}

function horsePath(posX,posY){
    for(i=-2;i<3;i=i+4){
        for(j=-1;j<2;j=j+2){
            try{
                board[posY+i][posX+j].classList.add("possibleMove");
            }catch(err){}
            try{
                board[posY+j][posX+i].classList.add("possibleMove");
            }catch(err){}
        }
    }
}


function towerPath(posX,posY){
    for(i=1;i<size;i++){
        if(posX+i<8){
            board[posY][posX+i].classList.add("possibleMove");
        }
        if(posX-i>=0){
            board[posY][posX-i].classList.add("possibleMove");
        }
        if(posY+i<8){
            board[posY+i][posX].classList.add("possibleMove");
        }
        if(posY-i>=0){
            board[posY-i][posX].classList.add("possibleMove");
        }
    }
}

function pawnPath(posX,posY){
    var pieceColor,enemy;
    if(board[posY][posX].classList.contains("white")){
        pieceColor = -1; //Direction on the board
        enemy = "black";
    }else{
        pieceColor = 1;
        enemy = "white";
    }
    if(!board[posY+pieceColor][posX].classList.contains(enemy)){
        board[posY+pieceColor][posX].classList.add("possibleMove");
        if((posY == 6 && pieceColor == -1) || (posY == 1 && pieceColor == 1)){
            board[posY+(2*pieceColor)][posX].classList.add("possibleMove");
        }
    }
    if(board[posY+pieceColor][posX+1].classList.contains(enemy)){
        board[posY+pieceColor][posX+1].classList.add("possibleMove");
    }
    if(board[posY+pieceColor][posX-1].classList.contains(enemy)){
        board[posY+pieceColor][posX-1].classList.add("possibleMove");
    }
}

function kingPath(posX,posY){
    if(posX+1<size){
        board[posY][posX+1].classList.add("possibleMove");
    }
    if(posX-1>-1){
        board[posY][posX-1].classList.add("possibleMove");
    }
    for(i=-1;i<2;i++){    
        if(posY-1>=0&&posX+i<size){
            board[posY-1][posX+i].classList.add("possibleMove");
        }
        if(posY+1<size && posX+i<size){
            board[posY+1][posX+i].classList.add("possibleMove");
        }
    }
}