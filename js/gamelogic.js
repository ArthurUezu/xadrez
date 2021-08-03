let board = document.getElementsByClassName("tile");
let i,round = 0;
let selected = 0;
let targetPos = 0;
let sourcePos = 0; 

// this function translates x y coordinates to a single coordinate on a vector
function coord(x,y){
    return (y*8)+x;
}
// PAWN SECTION
function setBPawn(x,y){
    if(x!=y){
        if((y==x+9||y==x+7)&&board[y].classList.contains("white")){
            return 1;
        }
        else if(x>7&&x<16){
            if(y==x+16||y==x+8){
                return 1;
            }
        }
        else if(y==x+8){
            return 1;
        }
    }
    return 0;
}
// it has to be 2 functions since they move in different directions
function setWPawn(x,y){
    if(x!=y){
        if((y==x-9||y==x-7)&&board[y].classList.contains("black")){
            return 1;
        }
        else if(x>47&&x<56){
            if(y==x-16||y==x-8){
                return 1;
            }
        }
        else if(y==x-8){
            return 1;
        }
    }
    return 0;
}
// HORSE SECTION
function setHorse(x,y){
    if(x!=y){
        // this is inneficient? probably, do I know a better way to solve it? nop
        // do you know how to solve it? dm me
        if(y==x+6||y==x-6||y==x+10||y==x-10||y==x+15||y==x-15||y==x+17||y==x-17){
            return 1;
        }
    }
    return 0;    
}

// BISHOP SECTION
function setBishop(x,y){
    if(x!=y){
        // had to create this exceptions because well, my mod calculations have some flaws
        if((x==0&&y==7)||(x==7&&y==0)||(x==56&&y==63)||(x==63&&y==56)){
            return 0;
        }
        if(((x-y)%7==0||(x+y)%9==0)||(x-y)%9==0||(x+y)%7==0){
            return 1;
        }
    }
    return 0;
}

// TOWER SECTION
function setTower(x,y){
    if(x!=y){
        // tower goes brrr
        if((y-x)%8==0||(Math.floor(x/8)==Math.floor(y/8))){
             return 1;
        }
    }
    return 0;
}

// KING SECTION
function setKing(x,y){
    if(x!=y){
        // yay king
        if(y==x+1||y==x-1||(y>x+6&&y<x+10)||(y>x-6&&y<x-10)){
            return 1;
        }
    }
    return 0;
}

// does what'
function setPiece(x,piece){
    board[x].classList.add(piece);
}

for(i=0;i<64;i++){
    board[i].addEventListener("click",selectPiece);
    // board[i].innerHTML = i;
}


function selectPiece(event){
    // get the target and the source of the move
    target = event.target;
    source = document.getElementById("selected");
    // if this is the selection of the target
    if(selected == 1){
        // resets count, 0 = selection of origin and 1 selection of target
        selected = 0;
        target.id = 'target';
        // if its the white's round
        sourcePos = position(source);
        targetPos = position(target);
        if(round%2==0){
            // it only lets you select whites
            if(source.classList.contains("white")&&!target.classList.contains("white")){
                // check wich piece u're selecting
                if(source.classList.contains("horse")){
                    // check if the move is legal
                    if(setHorse(sourcePos,targetPos)){
                        // executes the move and removes the class from source
                        resetTile(source);
                        resetTile(target);
                        setPiece(targetPos,"horse");
                        target.classList.add("white");  

                    }
                }
                else if(source.classList.contains("pawn")){
                    if(setWPawn(sourcePos,targetPos)){
                        resetTile(source);
                        resetTile(target);
                        setPiece(targetPos,"pawn");
                        target.classList.add("white");  
                    }
                }
                else if(source.classList.contains("bishop")){
                    if(setBishop(sourcePos,targetPos)){
                        resetTile(source);
                        resetTile(target);
                        setPiece(targetPos,"bishop");
                        target.classList.add("white");
                    }
                }
                else if(source.classList.contains("tower")){
                    if(setTower(sourcePos,targetPos)){
                        resetTile(source);
                        resetTile(target);
                        setPiece(targetPos,"tower");
                        target.classList.add("white");
                    }
                }
                else if(source.classList.contains("queen")){
                    if(setTower(sourcePos,targetPos)||setBishop(sourcePos,targetPos)){
                        resetTile(source);
                        resetTile(target);
                        setPiece(targetPos,"queen");
                        target.classList.add("white");
                    }
                }
                else if(source.classList.contains("king")){
                    if(setKing(sourcePos,targetPos)){
                        resetTile(source);
                        resetTile(target);
                        setPiece(targetPos,"king");
                        target.classList.add("white");
                    }
                }
                else{
                    round--;
                }
            }
        }
        else{
            if(source.classList.contains("black")){
                if(source.classList.contains("horse")){
                    if(setHorse(sourcePos,targetPos)){
                        resetTile(source);
                        resetTile(target);
                        setPiece(targetPos,"horse");
                        target.classList.add("black");
                    }
                }
                else if(source.classList.contains("pawn")){
                    if(setBPawn(sourcePos,targetPos)){
                        resetTile(source);
                        resetTile(target);
                        setPiece(targetPos,"pawn");
                        target.classList.add("black");                    }
                }
                else if(source.classList.contains("bishop")){
                    if(setBishop(sourcePos,targetPos)){
                        resetTile(source);
                        resetTile(target);
                        setPiece(targetPos,"bishop");
                        target.classList.add("black");
                    }
                }
                else if(source.classList.contains("tower")){
                    if(setTower(sourcePos,targetPos)){
                        resetTile(source);
                        resetTile(target);
                        setPiece(targetPos,"tower");
                        target.classList.add("black");
                    }
                }
                else if(source.classList.contains("queen")){
                    if(setTower(sourcePos,targetPos)||setBishop(sourcePos,targetPos)){
                        resetTile(source);
                        resetTile(target);
                        setPiece(targetPos,"queen");
                        target.classList.add("black");
                    }
                }
                else if(source.classList.contains("king")){
                    if(setKing(sourcePos,targetPos)){
                        resetTile(source);
                        resetTile(target);
                        setPiece(targetPos,"king");
                        target.classList.add("black");
                    }
                }
                else{
                    console.log("fuck")
                    round--;
                }

            }
        }
        
        target.id= "";
        source.id = "";
        round++;
    }
    // basic selection of origin of the move
    else if(target.classList.contains("black")||target.classList.contains("white")){
        selected++;
        target.id ='selected';

    }
}

function position(tile){
    for(i=0;i<64;i++){
        if(tile == board[i]){
            return i;
        }
    }
}

function resetTile(tile){
    tile.classList.remove("white");
    tile.classList.remove("black");
    tile.classList.remove("bishop");
    tile.classList.remove("horse");
    tile.classList.remove("tower");
    tile.classList.remove("queen");
    tile.classList.remove("pawn");
    tile.classList.remove("king");
}