const startBtn = document.querySelector('#start');
const screens = Array.from(document.querySelectorAll(".screen"))

const timeList = document.querySelector("#time-list")
const timeEl = document.querySelector('#time')

const modeList = document.querySelector('#mode-list')

const board = document.querySelector('#board')
const colors = ['linear-gradient(90deg, #2acc0a 0%, #3fdd00b7 47%, #7ef75677 100%)', 'linear-gradient(90deg, #ff1616 0%, #c41d1d 47%, #dc1a1ad4 100%', 'linear-gradient(90deg, #faaf00 0%, #c6760d 47%, #ad8017d4 100%)', 'linear-gradient(90deg, #c403ff 0%, #9924a8 47%, #89268cd4 100%)', 'linear-gradient(90deg, #16D9E3 0%, #30C7EC 47%, #46AEF7 100%']


let time = 0;
let score = 0;
let intervalCreateCircle;
let intervalTime;

startBtn.addEventListener("click", (event) => {
    event.preventDefault();
    screens[0].classList.add('up');
})

timeList.addEventListener("click", event => {
    if (event.target.classList.contains('time-btn')) {
        time = +event.target.getAttribute('data-time');
        screens[1].classList.add('up');
    }
})

modeList.addEventListener("click", event => {
    if (!event.target.classList.contains('mode-btn')) return;
    screens[2].classList.add('up')
    if (event.target.getAttribute('data-mode') === 'easy') startGame()
    else startGame('hard')
})

board.addEventListener("click", event => {
    if (event.target.classList.contains('circle')) {
        score++;
        event.target.remove();
        createRandomCircle();
    }
})

function startGame(mode = 'easy') {
    board.innerHTML = '';
    timeEl.parentNode.classList.remove('hide');
    setTime(time)
    intervalTime = setInterval(decreaseTime, 1000);
    if (mode === 'easy') createRandomCircle();
    else {
        createRandomCircle();
        intervalCreateCircle = setInterval(() => {
            board.innerHTML = '';
            createRandomCircle()
        }, 1750)
    }

}

function decreaseTime() {
    if (time === 0) {
        finishGame()
    } else {
        let current = --time;
        if (current<10) current = "0"+current;
        setTime(current)
    }
}

function setTime(value) {
    if (value === 60) timeEl.innerHTML = `01:00`
    else timeEl.innerHTML = `00:${value}`
}

function finishGame() {
    clearInterval(intervalTime)
    clearInterval(intervalCreateCircle)
    timeEl.parentNode.classList.add('hide');
    board.innerHTML = `<div><h1>Cчет: <span class='primary'>${score}</span></h1> <button class='again-btn'>Заново</button></div>`;
    const againBtn = document.querySelector('.again-btn');
    againBtn.addEventListener('click', againGame);
}

function createRandomCircle() {
    const circle = document.createElement('div');
    circle.style.background = getRandomColor();
    const size = getRandomNumber(10, 60);
    const {width, height} = board.getBoundingClientRect();
    const x = getRandomNumber(0, width-size);
    const y = getRandomNumber(0, height-size);

    circle.classList.add('circle');
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${x}px`;
    circle.style.left = `${y}px`;


    board.append(circle);
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max-min) + min)
}

function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)]
}

function againGame() {
    score = 0;
    screens.slice(1).forEach(el => {
        el.classList.remove('up')
    });
}