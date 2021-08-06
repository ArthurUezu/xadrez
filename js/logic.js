const size = 8;
// here i get the entire board in a vector with values ranging from 0 - 63 in the aux
let aux = document.getElementsByClassName("tile");

// board is going to be the real board for our game, but now its just an empty vector
let board = [];

// loop variables
let i,j;

// this loop is passing the aux to the board, creating a matrix of 8 by 8
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
    // color = 1 white, color = 2 black
    console.log("(y,x)="+posY+","+posX);

    // bishop movement, still requires a bit of improving
    if(piece.classList.contains("bishop")){
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
    else if(piece.classList.contains("horse")){
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
    else if(piece.classList.contains("tower")){
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
}


function selectPiece(event){
    // try catch is a much better solution for what i was trying to do in the last version,
    // this way i dont have to have a selection variable
    try{
        aux = document.getElementById(selected);
        // HERE IS GOING TO RUN THE MOVE SELECTION
    }catch(error){
        event.target.id = "selected";
        displayPath(event.target);
    }
    
}