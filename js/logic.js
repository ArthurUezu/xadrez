const size = 8;
let gameTurn = 0;
let roundText = document.getElementById("turno");
let i,j;

// this loop is passing the aux to the board, creating a matrix of 8 by 8
let aux = document.getElementsByClassName("tile");
let board = [];
for(i=0;i<size;i++){
    board[i] = new Array();
    for(j=0;j<size;j++){
        board[i][j] = aux[i*8+j];
        board[i][j].addEventListener("click",selectPiece);
    }
}

// the function display path is going to show where you can move your piece
function displayPossibleMoves(piece){
    const posY = (piece.offsetTop-16)/80;
    for(i=0;i<size;i++){
        if(piece == board[posY][i]){
            break;
        }
    }
    const posX = i;
    let pieceColor;
    if(piece.classList.contains("white")){
        pieceColor = 1;
    }
    if(piece.classList.contains("bishop")){
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
    else if(piece.classList.contains("king")){
        kingPath(posX,posY);
    }
    else if(piece.classList.contains("pawn")){
        pawnPath(posX,posY,pieceColor);
    }
}

function horsePath(posX,posY){
    for(i=-2;i<3;i=i+4){
        for(j=-1;j<2;j=j+2){
            try{
                board[posY+i][posX+j].classList.add("possible");
            }
            catch(err){}
            try{
                board[posY+j][posX+i].classList.add("possible");
            }
            catch(err){}
        }
    }
}

function bishopPath(posX,posY){
    for(i=0;i<=size;i++){
        try{
            board[posY+i][posX+i].classList.add("possible");
        }
        catch(err){}
        try{
            board[posY+i][posX-i].classList.add("possible");
        }
        catch(err){}
        try{
            board[posY-i][posX-i].classList.add("possible");
        }
        catch(err){}
        try{
            board[posY-i][posX+i].classList.add("possible");
        }
        catch(err){}
    }
}

function towerPath(posX,posY){
    for(i=0;i<size;i++){
        if(posX+i<8){
            board[posY][posX+i].classList.add("possible");
        }
        if(posX-i>=0){
            board[posY][posX-i].classList.add("possible");
        }
        if(posY+i<8){
            board[posY+i][posX].classList.add("possible");
        }
        if(posY-i>=0){
            board[posY-i][posX].classList.add("possible");
        }
    }
}

function kingPath(posX,posY){
    if(posX+1<size){
        board[posY][posX+1].classList.add("possible");
    }
    if(posX-1>-1){
        board[posY][posX-1].classList.add("possible");
    }
    for(i=-1;i<2;i++){    
        if(posY-1>=0&&posX+i<size){
            board[posY-1][posX+i].classList.add("possible");
        }
        if(posY+1<size && posX+i<size){
            board[posY+1][posX+i].classList.add("possible");
        }
        
    }
}

function pawnPath(posX,posY,color){
    if(color == 1){
        if(!board[posY-1][posX].classList.contains("black")){
            board[posY-1][posX].classList.add("possible");
            if(posY == 6){
                board[posY-2][posX].classList.add("possible");
            }
        }
        if(board[posY-1][posX+1].classList.contains("black")){
            board[posY-1][posX+1].classList.add("possible");
        }
        if(board[posY-1][posX-1].classList.contains("black")){
            board[posY-1][posX-1].classList.add("possible");
        }
    }
    else{
        if(board[posY+1][posX+1].classList.contains("white")){
            board[posY+1][posX+1].classList.add("possible");
        }
        if(board[posY+1][posX-1].classList.contains("white")){
            board[posY+1][posX-1].classList.add("possible");
        }
        if(!board[posY+1][posX].classList.contains("white")){
            board[posY+1][posX].classList.add("possible");
        }
        if(posY == 1){
            board[posY+2][posX].classList.add("possible");
        }
    }
}

// THIS FUNCTIONS STILL NEEDS IMPROVING
function resetTile(tile){
    // function resets the class names and id's used
    if(tile.classList.contains("odd")){
        tile.className = "tile odd";
    }
    else{
        tile.className = "tile";
    }
    tile.id = "";
    aux = document.getElementsByClassName("possible");
    for(i=0;i<size;i++){
        for(j=0;j<size;j++){
            board[i][j].classList.remove("possible");
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

function selectPiece(event){
    let source = document.getElementById("selected");
    if(source!=null && event.target.classList.contains("possible")){
        // this just prevents the reset of the black tile to turning white
        if(event.target.classList.contains("odd")){
            event.target.className ="odd "+source.className;
        }
        else{
            event.target.className = source.className;
            event.target.classList.remove("odd");
        }
        resetTile(source);
        nextTurn(); 
    }else{
        if(gameTurn%2 == 0 && event.target.classList.contains("white")){
            event.target.id = "selected";
            displayPossibleMoves(event.target);
        }
        else if(gameTurn%2 == 1 && event.target.classList.contains("black")){
            event.target.id = "selected";
            displayPossibleMoves(event.target);

        }
    }
}