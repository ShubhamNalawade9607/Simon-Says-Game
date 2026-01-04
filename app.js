let gameseq = [];
let userseq = [];
let btns = ["one", "two", "three", "four"];
let started = false;
let level = 0;
let highest_score = 0;
let isPlayingSequence = false;

let h2 = document.querySelector("#game-status");
let highScoreDisplay = document.querySelector("#high-score");
let currentScoreDisplay = document.querySelector("#current-score");

// Start the game
document.addEventListener("keypress", function() {
    if (started == false) {
        console.log("game has started.");
        started = true;
        level = 0;
        gameseq = [];
        userseq = [];
        levelup();
    }
});

// Game flash function
function gameflash(btn) {
    btn.classList.add("gameflash");
    setTimeout(function() {
        btn.classList.remove("gameflash");
    }, 400);
}

// User flash function
function userflash(btn) {
    btn.classList.add("userflash");
    setTimeout(function() {
        btn.classList.remove("userflash");
    }, 200);
}

// Level up - plays the full sequence
function levelup() {
    userseq = [];
    level++;
    h2.innerText = `Level ${level}`;
    currentScoreDisplay.innerText = level;

    let randidx = Math.floor(Math.random() * 4);
    let randcolor = btns[randidx];
    gameseq.push(randcolor);
    
    console.log("gameseq:", gameseq);

    // Play the entire sequence
    isPlayingSequence = true;
    playSequence();
}

// Play the complete sequence
function playSequence() {
    gameseq.forEach((color, index) => {
        setTimeout(() => {
            let btn = document.querySelector(`#${color}`);
            gameflash(btn);
            
            // Enable user input after sequence is complete
            if (index === gameseq.length - 1) {
                setTimeout(() => {
                    isPlayingSequence = false;
                    h2.innerText = `Your turn - Repeat the sequence`;
                }, 500);
            }
        }, index * 500);
    });
}

// Check sequence
function checkseq(idx) {
    if (gameseq[idx] == userseq[idx]) {
        if (gameseq.length == userseq.length) {
            setTimeout(() => {
                levelup();
            }, 800);
        }
    } else {
        h2.innerText = `Game Over! Your score is ${level}. Press any key to start.`;
        let body = document.querySelector("body");
        body.style.background = "red";
        setTimeout(function() {
            body.style.background = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
        }, 150);

        if (level > highest_score) {
            highest_score = level;
            highScoreDisplay.innerText = highest_score;
        }

        reset();
    }
}

// Button press handler
function btnpress() {
    if (isPlayingSequence || !started) return;

    let btn = this;
    userflash(btn);

    let usercolor = btn.getAttribute("id");
    userseq.push(usercolor);
    console.log(`userseq: ${userseq}`);

    checkseq(userseq.length - 1);
}

// Add event listeners to buttons
let allbtns = document.querySelectorAll(".box");
for (btn of allbtns) {
    btn.addEventListener("click", btnpress);
}

// Reset game
function reset() {
    gameseq = [];
    userseq = [];
    started = false;
    level = 0;
    isPlayingSequence = false;
    currentScoreDisplay.innerText = 0;
}
