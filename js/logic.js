const size = 8;
let aux = document.getElementsByClassName("tile");
let board = [];
let i,j;
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
function displayPath(piece){
    let posY = (piece.offsetTop-16)/80;
    let posX;
    let color = piece.classList.contains("white");
    // color = 1 white, color = 2 black
    for(i=0;i<size;i++){
        if(piece == board[posY][i]){
            posX = i;
            break;
        }
    }
    console.log("(y,x)="+posY+","+posX);
    if(piece.classList.contains("bishop")){
        for(i=0;i<=posX;i++){
            if(size > posY+i){
                board[posY+i][posX-i].classList.add("possible");
                if(posX+i<8){
                    board[posY+i][posX+i].classList.add("possible");
                }
            }
            if(posY-i!=-1){
                board[posY-i][posX-i].classList.add("possible");
                if(posX+i<8){
                    board[posY-i][posX+i].classList.add("possible");
                }
            }
        }
    }
}

function selectPiece(event){
    try{
        aux = document.getElementById(selected);
        // HERE IS GOING TO RUN THE MOVE SELECTION
    }catch(error){
        event.target.id = "selected";
        displayPath(event.target);
    }
    
}