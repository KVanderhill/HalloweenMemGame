/*Adds audio in game from files*/
/*Commented out certain audio features in case I want to add them back in later*/
class AudioController {
    constructor() {
        // this.bgMusic = new Audio('../Assets/audio/creepy.mp3');
        this.flipSound = new Audio('./Assets/audio/flip.wav');
        this.matchSound = new Audio('./Assets/audio/match.wav');
        this.victorySound = new Audio('./Assets/audio/victory.wav');
        this.gameOverSound = new Audio('./Assets/audio/gameOver.wav');
        // this.bgMusic.volume = 0.2;
        // this.bgMusic.loop = true;
    }
    startMusic() {
        // this.bgMusic.play();
    }
    stopMusic() {
        // this.bgMusic.pause();
        // this.bgMusic.currentTime = 0;
    }
    flip() {
        this.flipSound.play();
    }
    match() {
        this.matchSound.play();
    }
    victory() {
        // this.stopMusic();
        this.victorySound.play();
    }
    gameOver() {
        // this.stopMusic();
        this.gameOverSound.play();
    }
}

class MixOrMatch {
    constructor(totalTime, cards) {
        this.cardsArray = cards;
        this.totalTime = totalTime;
        this.timeRemaining = totalTime;
        this.timer = document.getElementById('time-remaining');
        this.ticker = document.getElementById('flips');
        this.audioController = new AudioController();
        this.gameStarted = false; // Track game start state
    }

    startGame() {
        this.totalClicks = 0;
        this.timeRemaining = this.totalTime;
        this.cardToCheck = null;
        this.matchedCards = [];
        this.busy = false;
        this.gameStarted = false; // Reset game start state
        this.hideCards();
        setTimeout(() => { // Add delay before shuffling
        this.shuffleCards(this.cardsArray); // Shuffle cards when the game starts
    }, 500); // Adjust delay as needed
        this.timer.innerText = this.timeRemaining;
        this.ticker.innerText = this.totalClicks;
        // Hide the start button initially
        document.getElementById('start-button').style.display = 'block';
    }

    startTimer() {
        this.gameStarted = true; // Set game start state
        this.countdown = this.startCountdown();
    }

    startCountdown() {
        return setInterval(() => {
            this.timeRemaining--;
            this.timer.innerText = this.timeRemaining;
            if (this.timeRemaining === 0)
                this.gameOver();
        }, 1000);
    }

    gameOver() {
        clearInterval(this.countdown);
        this.audioController.gameOver();
        document.getElementById('game-over-text').classList.add('visible');
       
    }

    victory() {
        clearInterval(this.countdown);
        this.audioController.victory();
        document.getElementById('victory-text').classList.add('visible');
       
    }

    hideCards() {
        this.cardsArray.forEach(card => {
            card.classList.remove('visible');
            card.classList.remove('matched');
        });
    }

    flipCard(card) {
        if (this.canFlipCard(card)) {
            this.audioController.flip();
            this.totalClicks++;
            this.ticker.innerText = this.totalClicks;
            card.classList.add('visible');

            if (this.cardToCheck) {
                this.checkForCardMatch(card);
            } else {
                this.cardToCheck = card;
            }
        }
    }

    checkForCardMatch(card) {
        if (this.getCardType(card) === this.getCardType(this.cardToCheck))
            this.cardMatch(card, this.cardToCheck);
        else
            this.cardMismatch(card, this.cardToCheck);

        this.cardToCheck = null;
    }

    cardMatch(card1, card2) {
        this.matchedCards.push(card1);
        this.matchedCards.push(card2);
        card1.classList.add('matched');
        card2.classList.add('matched');
        this.audioController.match();
        if (this.matchedCards.length === this.cardsArray.length)
            this.victory();
    }

    cardMismatch(card1, card2) {
        this.busy = true;
        setTimeout(() => {
            card1.classList.remove('visible');
            card2.classList.remove('visible');
            this.busy = false;
        }, 1000);
    }

    /* Fisher Yates Shuffle Algorithm */
    shuffleCards(cardsArray) {
         

        for (let i = cardsArray.length - 1; i > 0; i--) {
            let randIndex = Math.floor(Math.random() * (i + 1));
            // Swap elements
            [cardsArray[i], cardsArray[randIndex]] = [cardsArray[randIndex], cardsArray[i]];
        }
        // After shuffling, update the DOM
        cardsArray.forEach((card, index) => {
            card.style.order = index; // Ensure order reflects the new position
        });

    
    }

    getCardType(card) {
        return card.getElementsByClassName('card-value')[0].src;
    }

    canFlipCard(card) {
        return this.gameStarted && !this.busy && !this.matchedCards.includes(card) && card !== this.cardToCheck;
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready() {
    let overlays = Array.from(document.getElementsByClassName('overlay-text'));
    let cards = Array.from(document.getElementsByClassName('card'));
    let game = new MixOrMatch(100, cards);

    overlays.forEach(overlay => {
        overlay.addEventListener('click', () => {
            overlay.classList.remove('visible');
            cards = Array.from(document.getElementsByClassName('card')); // Update the array in case new cards were added
            game.cardsArray = cards; // Update the game's card array
            game.startGame();
        });
    });

    cards.forEach(card => {
        card.addEventListener('click', () => {
            game.flipCard(card);
        });
    });

    // Start button event listener
    const startButton = document.getElementById('start-button');
    startButton.addEventListener('click', () => {
        startButton.style.display = 'none'; // Hide start button after clicking
        game.startTimer(); // Start the timer
    });
}
