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
    console.time("bishop");
    const color = getColor(posX,posY);
    for(i=1;isValid(posY+i,posX+i,color);i++){
        board[posY+i][posX+i].classList.add("possibleMove");
    }
    for(i=1;isValid(posY+i,posX-i,color);i++){
        board[posY+i][posX-i].classList.add("possibleMove");
    }
    for(i=1;isValid(posY-i,posX-i,color);i++){
        board[posY-i][posX-i].classList.add("possibleMove");
    }
    for(i=1;isValid(posY-i,posX+i,color);i++){
        board[posY-i][posX+i].classList.add("possibleMove");
    }
    console.timeEnd("bishop");
}

function horsePath(posX,posY){
    const color = getColor(posX,posY);
    for(i=-2;i<3;i=i+4){
        for(j=-1;j<2;j=j+2){
            if(isValid(posY+i,posX+j,color)){
                board[posY+i][posX+j].classList.add("possibleMove");
            }
            if(isValid(posY+j,posX+i,color)){
                board[posY+j][posX+i].classList.add("possibleMove");
            }
        }
    }
}

function towerPath(posX,posY){
    const color = getColor(posX,posY);
    for(i=0;isValid(posY,posX+i,color);i++){
        board[posY][posX+i].classList.add("possibleMove");
    }
    for(i=1;isValid(posY,posX-i,color);i++){
        board[posY][posX-i].classList.add("possibleMove");
    }
    for(i=1;isValid(posY+i,posX,color);i++){
        board[posY+i][posX].classList.add("possibleMove");
    }
    for(i=1;isValid(posY-i,posX,color);i++){
        board[posY-i][posX].classList.add("possibleMove");
    }
}

function pawnPath(posX,posY){
    var enemy;
    const pieceColor = getColor(posX,posY);
    if(pieceColor == -1){
        enemy = "black";
    }
    else{
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
    const color = getColor(posX,posY);
    if(isValid(posY,posX+1,color)){
        board[posY][posX+1].classList.add("possibleMove");
    }
    if(isValid(posY,posX-1,color)){
        board[posY][posX-1].classList.add("possibleMove");
    }
    for(i=-1;i<2;i++){    
        if(isValid(posY-1,posX+i,color)){
            board[posY-1][posX+i].classList.add("possibleMove");
        }
        if(isValid(posY+1,posX+i,color)){
            board[posY+1][posX+i].classList.add("possibleMove");
        }
    }
}

function getColor(posX,posY){
    if(board[posY][posX].classList.contains("white")){
        return -1;
    }
    else if(board[posY][posX].classList.contains("black")){
        return 1;
    }
    else{
        return 0;
    }
}

function isValid(posY,posX,originColor){
    if(posX < 0 || posY < 0){
        return false;
    }
    else if(posX > size-1 || posY > size-1){
        return false;
    }
    const pieceColor = getColor(posX,posY);
    if(pieceColor==0){
        return true;
    }
    else if((originColor+pieceColor) == 0){
        board[posY][posX].classList.add("possibleMove");
        return false;
    }
    return false;
 }