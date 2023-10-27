
const cursor = document.querySelector('.cursor')
let score = 0;
let gameOver = false;
let lastHole = 0;
let lastMole = 0;
let timer = 0;
let timeUp = 0;

const sound = new Audio("assets/smash.mp3")

$(function () {
    $('#start').click(StartGame);
    $('.gamewrap').on('click', '.mole', playStart);
});

//Functions

function playStart() {

    $(this).parent().find('img').show();
    $(this).hide();
    $(this).parent().find('img').fadeOut(1000);

    score++;
    var stringScore = score.toString();
    stringScore = stringScore.padStart(2, '0');
    $('.score').text(stringScore);
}

function StartGame() {
    $('#start').hide();
    gameOver = false;
    $('.message').html('');
    score = 0;
    $('.score').text('00');

    // initialize countdown timer
    var countdown = 30;
    $('.timer').text(countdown);

    // start gameplay
    MakeGameBoard();
    StartMoles();

    // start countdown timer
    var countdownInterval = setInterval(function() {
        countdown--;
        $('.timer').text(countdown);
        if (countdown === 0) {
            EndGame();
            clearInterval(countdownInterval);
        }
    }, 1000);
};

function StartMoles() {

    setTimeout(function () {
        changeMole();
    }, 200);

    //Set Random Hole
    var popUp = $('.hole_' + RandomHole() + '>.mole');
    timeUp = Math.round(Math.random() * 1000) + 600;
    popUp.show();
    //Pop Up
    popUp.animate({
        bottom: '0px'
    }, 500);

    //Pop Down
    setTimeout(function () {
        popUp.animate({
            bottom: '-150px'
        }, 300);
        if (!gameOver) {
            StartMoles();
        }
    }, timeUp);
}

function RandomHole() {
    var hole = 1 + (Math.floor(Math.random() * $('.hole').length));
    if (hole == lastHole) {
        return RandomHole();
    }
    lastHole = hole;
    //console.log('Random Hole: ' + hole)
    return hole;
}

function RandomMole() {
    var mole = 1 + (Math.floor(Math.random() * 9));
    if (mole == lastMole) {
        return RandomMole();
    }
    lastMole = mole;

    return mole;
}

function changeMole() {
    RandomMole();

    for (var i = 0; i < 9; i++) {
        $('.mole.mole_' + i).css({
            backgroundImage: 'url(assets/mole.png)'
        })
    }
}

function MakeGameBoard() {

    var moles = 9;
    var html = '';

    for (var mole = 1; mole < moles + 1; mole++) {
        html += '<div class= "hole hole_' + mole + '"><img src="assets/wack.png" class="wack"><div class="molehill molehill_' + mole + '">';
        html += '</div><div class= "mole mole_' + mole + '"></div></div></div><!--end_hole_' + mole + '-->';
    };

    $('.gamewrap').html(html);
}

function blink_text() {
    $('.message').fadeOut(300);
    $('.message').fadeIn(300);
}
setInterval(blink_text, 2000);

function EndGame() {
    gameOver = true;
    blink_text();
    setTimeout(function () {
        $('.message').html('Time Out');
        $('#start').show();
    }, timer + 500);
}

// changement de la souris
document.addEventListener('mousemove', e => {
    cursor.style.top = e.pageY + 'px'
    cursor.style.left = e.pageX + 'px'
})
document.addEventListener('mousedown', () => {
    cursor.classList.add('active')
})
document.addEventListener('mouseup', () => {
    cursor.classList.remove('active')
})