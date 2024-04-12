document.addEventListener('DOMContentLoaded', function() {
const h2 = document.querySelector("h2");
const h1 = document.querySelector('h1');
let gameStarted = false;
let gamePaused = false;
let score = 0;
let scoreEl;
let holes;
h1.textContent = "Press Any Key To Start";
h2.remove();


document.addEventListener('mousemove', function(e) {
    const cursor = document.querySelector(".cursor");
    cursor.style.top = e.pageY + 'px';
    cursor.style.left = e.pageX + 'px';
});

document.addEventListener('keydown', function(event){
    
    if (!gameStarted && event.target.id !== 'stopButton') {
        h1.textContent = "Whac a mole";
        document.body.appendChild(h2);
        scoreEl = document.querySelector('h2 span');
        holes = document.querySelectorAll(".hole");

        function run() {
            let timer = null;
            var ranum = Math.floor(Math.random() * 9);
            var ranhole = holes[ranum];
            
            if (!ranhole.querySelector(".mole-img")) {
                var img = document.createElement("img");
                img.classList.add('mole-img');
                img.setAttribute('src', './moleori.png');
                ranhole.appendChild(img);
                img.addEventListener('click', function() {
                    whacksound();
                    score += 10;
                    scoreEl.textContent = score;
                    clearTimeout(timer);
                    setTimeout(function() {
                        ranhole.removeChild(img);
                        run();
                    }, 500); 
                });
                timer = setTimeout(function() {
                    ranhole.removeChild(img);
                    run();
                }, 1000);
            } else {
                
                run();
            }
        }

        function run2() {
            let timer2 = null;
            var ranum2 = Math.floor(Math.random() * 9);
            var ranhole2 = holes[ranum2];
            
            if (!ranhole2.querySelector(".mole-img")) {
                var img2 = document.createElement("img");
                img2.classList.add('mole-img');
                img2.setAttribute('src', './alienori2.png');
                ranhole2.appendChild(img2);
                img2.addEventListener('click', function() {
                    caution();
                    score -= 5;
                    scoreEl.textContent = score;
                    clearTimeout(timer2);
                    setTimeout(function() {
                        ranhole2.removeChild(img2);
                        run2();
                    }, 500);
                });
                timer2 = setTimeout(function() {
                    ranhole2.removeChild(img2);
                    run2();
                }, 1000);
            } else {
                
                run2();
            }
        }

        run();
        run2();

        gameStarted = true;
    }
});


const stopButton = document.getElementById("stopButton");
stopButton.addEventListener("click", function() {
    gamePaused = !gamePaused; 
    
    clearTimeoutAll();

    
    if (gamePaused) {
        gameStarted = false; 
        score = 0;
        scoreEl.textContent = score;
        holes.forEach(hole => {
            while (hole.firstChild) {
                hole.removeChild(hole.firstChild);
            }
        });
    }
});

function whacksound() {
    var audio = new Audio('./assets_smash.mp3');
    audio.play();
}


function clearTimeoutAll() {
    let moleImgs = document.querySelectorAll('.mole-img');
    moleImgs.forEach(img => {
        img.parentElement.removeChild(img);
    });
}


window.addEventListener("mousedown", () => {
    const cursor = document.querySelector(".cursor");
    cursor.classList.add("active");
});


window.addEventListener("mouseup", () => {
    const cursor = document.querySelector(".cursor");
    cursor.classList.remove("active");
});

const refreshBtn = document.querySelector(".button-pressed");

function handleClick() {
    window.location.reload();
}

refreshBtn.addEventListener("click", handleClick);

function caution()
{
    var audio = new Audio('./discord-leave.mp3');
    audio.play();
}
});