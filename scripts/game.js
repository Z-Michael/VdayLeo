let score = 0;
let gameActive = false;
let hearts = [];
let messageIndex = 0;

const startButton = document.getElementById('start-button');
const gameContainer = document.getElementById('game-container');

// Different affection messages with emojis - English, Amharic & Swahili blend
const affectionMessages = [
    { text: "You make my heart skip a beat! 💗", emoji: "💗" },
    { text: "Amet'aleh (I love you)! 😍", emoji: "😍" },
    { text: "Nakupenda sana (I love you deeply)! 🌹", emoji: "🌹" },
    { text: "Every day with you is a blessing! ✨", emoji: "✨" },
    { text: "You light up my world! ☀️", emoji: "☀️" },
    { text: "Konjo (Darling), you're my forever! ♾️", emoji: "♾️" },
    { text: "You're my person! 👫", emoji: "👫" },
    { text: "I adore you more each day! 💕", emoji: "💕" },
    { text: "You complete me! 💑", emoji: "💑" },
    { text: "Wewe ni moyo yangu (You are my heart)! 💝", emoji: "💝" },
    { text: "You're absolutely stunning! 🌟", emoji: "🌟" },
    { text: "Selamem (Forever) with you! 🍀", emoji: "🍀" },
    { text: "Your confidence captivates me! 👑", emoji: "👑" },
    { text: "You're a queen and I cherish you! 👸", emoji: "👸" },
    { text: "Alemedelem (Beautiful) in every way! 🔥", emoji: "🔥" },
    { text: "You shine brighter than any star! ⭐", emoji: "⭐" },
    { text: "Your strength amazes me daily! 💪", emoji: "💪" },
    { text: "You're majestic and kind! 🦁", emoji: "🦁" },
    { text: "Your warmth melts my heart! 💎", emoji: "💎" },
    { text: "You're my forever person! ♥️", emoji: "♥️" },
];

if (startButton) {
    startButton.addEventListener('click', startGame);
}

function startGame() {
    gameActive = true;
    score = 0;
    messageIndex = 0;
    gameContainer.innerHTML = `
        <h2>What I Feel For You 💕</h2>
        <p id="score">Messages: ${score} / 20</p>
        <div id="message-display"></div>
        <div id="hearts-container"></div>
        <button id="end-button" class="game-button">Stop</button>
    `;
    
    generateHearts(5);
    const endButton = document.getElementById('end-button');
    endButton.onclick = null;
    endButton.addEventListener('click', endGame);
}

function generateHearts(count = 5) {
    const container = document.getElementById('hearts-container');
    container.innerHTML = '';
    hearts = [];
    
    for (let i = 0; i < count; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = '❤️';
        heart.style.animationDelay = `${i * 0.2}s`;
        heart.dataset.clicked = 'false';
        heart.addEventListener('click', collectHeart);
        heart.addEventListener('touchend', (e) => {
            e.preventDefault();
            collectHeart(e);
        });
        container.appendChild(heart);
        hearts.push(heart);
    }
}

function collectHeart(e) {
    if (e.target.dataset.clicked === 'true') return;
    if (!gameActive) return;
    
    e.target.dataset.clicked = 'true';
    score++;
    document.getElementById('score').textContent = `Messages: ${score} / 20`;
    
    const messageDisplay = document.getElementById('message-display');
    
    const isPhotoSurprise = Math.random() < 0.3;
    
    if (isPhotoSurprise) {
        messageDisplay.innerHTML = `
            <div class="message-box photo-surprise">
                <p class="surprise-text">OMG! 😍 Here's us!</p>
                <img src="assets/images/couple.jpg" alt="Our special moment" class="photo-display" onerror="this.parentElement.innerHTML='<p>Add your photo to assets/images/couple.jpg!</p>'">
                <p class="affection-text">You make me so happy! 💕</p>
            </div>
        `;
    } else {
        const message = affectionMessages[messageIndex % affectionMessages.length];
        messageDisplay.innerHTML = `
            <div class="message-box">
                <p class="message-text">${message.text}</p>
            </div>
        `;
        messageIndex++;
    }
    
    // Remove the clicked heart
    e.target.style.opacity = '0';
    e.target.style.pointerEvents = 'none';
    setTimeout(() => {
        e.target.remove();
    }, 300);
    
    // Check if all hearts in current batch are gone
    setTimeout(() => {
        const allHearts = document.querySelectorAll('.heart');
        const clickedHearts = Array.from(allHearts).filter(h => h.dataset.clicked === 'true');
        const remainingHearts = allHearts.length - clickedHearts.length;
        
        if (remainingHearts === 0) {
            if (score === 20) {
                // All 20 hearts done - show celebration
                setTimeout(() => {
                    showCelebration();
                }, 500);
            } else {
                // Show "more to click babe" button
                gameActive = false;
                showMoreButton();
            }
        }
    }, 400);
}

function showMoreButton() {
    const endButton = document.getElementById('end-button');
    endButton.textContent = '💕 More to click babe... 💕';
    endButton.style.background = 'linear-gradient(135deg, #ff69b4 0%, #ff1493 100%)';
    endButton.style.transform = 'scale(1.1)';
    endButton.onclick = null;
    endButton.removeEventListener('click', endGame);
    endButton.addEventListener('click', loadNextBatch);
}

function loadNextBatch() {
    const endButton = document.getElementById('end-button');
    const messageDisplay = document.getElementById('message-display');
    
    messageDisplay.innerHTML = '';
    generateHearts(5);
    
    gameActive = true;
    endButton.textContent = 'Stop';
    endButton.style.background = '';
    endButton.style.transform = '';
    endButton.onclick = null;
    endButton.removeEventListener('click', loadNextBatch);
    endButton.addEventListener('click', endGame);
}

function showCelebration() {
    gameActive = false;
    gameContainer.innerHTML = `
        <div class="celebration-box">
            <p class="flower-emoji">🌹🌹🌹</p>
            <h2>Happy Valentine's Day! 💕</h2>
            <p class="celebration-text">You've revealed all <strong>${score}</strong> messages of my affection!</p>
            <p class="celebration-message">Thank you for being the light in my life!</p>
            <p class="flower-emoji">🌹🌹🌹</p>
            <button id="start-button" class="game-button">Play Again</button>
        </div>
    `;
    
    document.getElementById('start-button').addEventListener('click', startGame);
}

function endGame() {
    gameActive = false;
    gameContainer.innerHTML = `
        <h2>How I Feel 💗</h2>
        <p>You've revealed <strong>${score}</strong> messages!</p>
        <p class="affection-message">You mean everything to me. Forever cherishing you 💕</p>
        <button id="start-button" class="game-button">Reveal Again</button>
    `;
    
    document.getElementById('start-button').addEventListener('click', startGame);
}

function handleTouchStart(e) {
    if (e.target.classList.contains('heart')) {
        e.target.style.transform = 'scale(1.2)';
    }
}