const size = 8;
// here i get the entire board in a vector with values ranging from 0 - 63 in the aux

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
for(i=0;i<size;i++){
    for(j=0;j<size;j++){
        board[i][j].innerHTML = i+","+j;
    }
}

// the function display path is going to show where you can move your piece
function displayPath(piece){
    // i get the Y position and  the X position
    let posY = (piece.offsetTop-16)/80;
    let posX;
    for(i=0;i<size;i++){
        if(piece == board[posY][i]){
            posX = i;
            break;
        }
    }
    let color = piece.classList.contains("white");
    // color = 1 white, color = 0 black
    console.log("(y,x)="+posY+","+posX);

    // bishop movement, still requires a bit of improving
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
        pawnPath(posX,posY,color);
    }
}

function horsePath(posX,posY){
    if(posY+2<8){
        if(posX+1<8){
            board[posY+2][posX+1].classList.add("possible");
        }
        if(posX-1>=0){
            board[posY+2][posX-1].classList.add("possible");
        }
    }
    if(posY-2>=0){
        if(posX+1<8){
            board[posY-2][posX+1].classList.add("possible");
        }
        if(posX-1>=0){
            board[posY-2][posX-1].classList.add("possible");
        }
    }
    if(posY+1<8){
        if(posX+2<8){
            board[posY+1][posX+2].classList.add("possible");
        }
        if(posX-2>=0){
            board[posY+1][posX-2].classList.add("possible");
        }
    }
    if(posY-1>=0){
        if(posX+2<8){
            board[posY-1][posX+2].classList.add("possible");
        }
        if(posX-2>=0){
            board[posY-1][posX-2].classList.add("possible");
        }
    }
}

function bishopPath(posX,posY){
    for(i=0;i<=size;i++){
        if(size > posY+i){
            if(posX-i>-1){
                board[posY+i][posX-i].classList.add("possible");
            }
            if(posX+i<8){
                board[posY+i][posX+i].classList.add("possible");
            }
        }
        if(posY-i>-1){
            board[posY-i][posX-i].classList.add("possible");
            if(posX+i<8){
                board[posY-i][posX+i].classList.add("possible");
            }
        }
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
    board[posY][posX+1].classList.add("possible");
    board[posY][posX-1].classList.add("possible");
    for(i=-1;i<2;i++){    
        if(posY-1>=0&&posX+i<8){
            board[posY-1][posX+i].classList.add("possible");
        }
        if(posY+1<8 && posX+i<8){
            board[posY+1][posX+i].classList.add("possible");
        }
        
    }
}

function pawnPath(posX,posY,color){
    if(color == 1){
        if(board[posY-1][posX+1].classList.contains("black")){
            board[posY-1][posX+1].classList.add("possible");
        }
        if(board[posY-1][posX-1].classList.contains("black")){
            board[posY-1][posX-1].classList.add("possible");
        }
        if(!board[posY-1][posX].classList.contains("black")){
            board[posY-1][posX].classList.add("possible");
        }
        if(posY == 6){
            board[posY-2][posX].classList.add("possible");
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

function selectPiece(event){
    // try catch is a much better solution for what i was trying to do in the last version,
    // this way i dont have to have a selection variable
    try{
        aux = document.getElementById(selected);
        // HERE IS GOING TO RUN THE MOVE SELECTION
        if(event.target.classList.contains("possible")){
            event.target.classList.add("");
        }
    }catch(error){
        event.target.id = "selected";
        displayPath(event.target);
    }
    
}