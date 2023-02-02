// Initial Datas

let stage = {
    a1: '', a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: ''
};
let player = '';
let winner = '';
let playing = false;

reset();

// Events

document.querySelector('.reset').addEventListener('click', reset);
document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', itemClick);
});

// Functions

function itemClick(e) {
    let item = e.target.getAttribute('data-item');
    if (playing && stage[item] === '') {
        stage[item] = player;
        renderStage();
        togglePlayer();
    }
};

function reset() {
    winner = '';

    let randow = Math.floor(Math.random() * 2);
    player = (randow === 0) ? 'x' : 'o';

    for (let i in stage) {
        stage[i] = '';
    };

    playing = true;

    renderStage();
    renderInfo();
};

function renderStage() {
    for (let i in stage) {
        let item = document.querySelector(`div[data-item=${i}]`);
        item.innerHTML = stage[i];
    }

    checkGame();
};

function renderInfo() {
    document.querySelector('.vez').innerHTML = player;
    document.querySelector('.resultado').innerHTML = winner;
};

function togglePlayer() {
    player = (player === 'x') ? 'o' : 'x';
    renderInfo();
};

function checkGame() {
    if (checkWinner('x')) {
        winner = 'O "x" venceu';
        playing = false;
    } else if (checkWinner('o')) {
        winner = 'O "o" venceu';
        playing = false;
    } else if (isFull()) {
        winner = 'Jogo empatou';
        playing = false;
    }
};

function checkWinner(player) {
    let pos = [
        'a1, a2, a3',
        'b1, b2, b3',
        'c1, c2, c3',

        'a1, b1, c1',
        'a2, b2, c2',
        'a3, b3, c3',

        'a1, b2, c3',
        'c1, b2, a3'
    ];

    for (let w in pos) {
        let pArray = pos[w].split(',');
        let win = pArray.every(option => stage[option] === player);
        if (win) {
            return true;
        }
    }
    return false;
};

function isFull() {
    for (let i in stage) {
        if (stage[i] === '') {
            return false;
        }
    }
    return true;
};