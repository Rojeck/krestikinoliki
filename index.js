const avatarContainer = document.querySelectorAll('.avatar-container'),
    avatar = document.querySelectorAll('.avatar-icon'),
    avatarIcons = document.querySelector('.icons'),
    tileContainer = document.querySelector('.container'),
    playerDisplay = document.querySelector('.display-player'),
    resetBtn = document.querySelector('#reset');
    let turn = 'X';

const dragAndDrop = function () {
    let avatarElement;
    function dragOver (e) {
        e.preventDefault();
    }
    function dragDrop () {
        this.append(avatarElement);
        avatarElement.draggable = false;
        this.removeEventListener('drop', dragDrop)
        this.removeEventListener('dragover', dragOver)
    }
    avatarContainer.forEach(el => {
        el.addEventListener('dragover', dragOver);
        el.addEventListener('drop', dragDrop);
    });
    avatar.forEach(el => {
        el.addEventListener('dragstart', (e) => {
            avatarElement = e.target;
            setTimeout(() => {
                e.target.classList.add('hide');
            }, 0);
        });
        el.addEventListener('dragend', (e) => {
            e.target.classList.remove('hide');
        });
        el.addEventListener('dragenter', (e) => {
            e.preventDefault();
        })
    });    
};

const positionObj = {
    position: -1,
    positionLeft: function (){
        if (this.position <= 0){
            this.position = 8;
        } else {
            --this.position;
        }
        addHighlightClass(this.position);
    },
    positionRight: function(){
        
        if (this.position === 8){
            this.position = 0;
            
        } else {
            ++this.position;
        }
        addHighlightClass(this.position);
    },
    positionEsc: function(){
        this.position = -1;
        addHighlightClass(this.position, false);
    },
    positionEnter: function(){
         makeTurn(document.querySelector('.tile.active'));
    }    
};

function addHighlightClass (pos, active = true) {
    const tileContainer = document.querySelectorAll('.tile');
    tileContainer.forEach(el => {
        el.classList.remove('active')
    });
    if (active) {
        tileContainer[pos].classList.add('active');
    }
}

function makeTurn (tile){
    if (tile.textContent === '' ){
            tile.innerHTML = turn;
            setTimeout(() => {
                if (checkVictory(turn)){
                    alert(`Player ${turn} won!`);
                    reset();
                } else {
                    turn === 'O' ? turn = 'X': turn = 'O';
                    playerDisplay.innerHTML = turn;
                }
            }, 0);
        }
    }

const tileHandler = function () {
    tileContainer.addEventListener('click', (e) => {
        if (e.target && e.target.classList.contains('tile') && e.target.textContent === '') {
            makeTurn(e.target);
        }
    })
};

const createTiles = function () {
    for (let j = 0; j < 9; j++) {
        const tile = document.createElement('div');
        tile.classList.add('tile');
        tileContainer.append(tile);
    }
};

const getGameTable = function (){
    const tileContainer = document.querySelectorAll('.tile'),
        gameTable = [];
        tileContainer.forEach((el,index) => {
            gameTable[index] = el.textContent;
        });
    return gameTable;
};

const checkVictory = function (player){
    const arr = getGameTable();
    if (arr.some(el => el === '')){
        if ([arr[0],arr[4],arr[8]].every((el) => el === player) ||
    [arr[2],arr[4],arr[6]].every((el) => el === player) ||
    [arr[0],arr[1],arr[2]].every((el) => el === player) ||
    [arr[3],arr[4],arr[5]].every((el) => el === player) ||
    [arr[6],arr[7],arr[8]].every((el) => el === player) ||
    [arr[0],arr[3],arr[6]].every((el) => el === player) ||
    [arr[1],arr[4],arr[7]].every((el) => el === player) ||
    [arr[2],arr[5],arr[8]].every((el) => el === player)) {
        return true;
    } else {
        return false;
    }
    } else {
        alert('Nobody won');
        reset();
    }
};
function reset (){
    const tiles = document.querySelectorAll('.tile');
    tiles.forEach(tile => {
        tile.innerHTML = '';
})
}

resetBtn.addEventListener('click', reset);

tileHandler();
createTiles();
dragAndDrop();

document.addEventListener('keydown', (e) => {
    if (e.code === 'ArrowLeft') {
       positionObj.positionLeft();
    } else if (e.code === 'ArrowRight') {
       positionObj.positionRight();
    } else if (e.code === 'Escape') {
        positionObj.positionEsc();
    } else if (e.code === 'Space') {
        positionObj.positionEnter();
    }
})
