let score = 0;
let gameActive = false;
let hearts = [];
let messageIndex = 0;

const startButton = document.getElementById('start-button');
const gameContainer = document.getElementById('game-container');

// Different affection messages with emojis - English, Amharic & Swahili blend
const affectionMessages = [
    { text: "You're confident & magnetic! 👑", emoji: "👑" },
    { text: "Your charisma is irresistible! ✨", emoji: "✨" },
    { text: "You lead with grace & strength! 💪", emoji: "💪" },
    { text: "Your loyalty is unmatched! ♥️", emoji: "♥️" },
    { text: "You're passionate about everything! 🔥", emoji: "🔥" },
    { text: "Your generosity melts my heart! 💕", emoji: "💕" },
    { text: "You're naturally creative & artistic! 🎨", emoji: "🎨" },
    { text: "Your warmth brings joy to all! ☀️", emoji: "☀️" },
    { text: "You're ambitious & driven! 🚀", emoji: "🚀" },
    { text: "Your humor lights up my world! 😄", emoji: "😄" },
    { text: "You're fiercely protective of loved ones! 🦁", emoji: "🦁" },
    { text: "Your beauty shines from within! 💎", emoji: "💎" },
    { text: "You're independent & strong-willed! 💪", emoji: "💪" },
    { text: "Your honesty is refreshingly rare! ⭐", emoji: "⭐" },
    { text: "You're a natural entertainer! 🎭", emoji: "🎭" },
    { text: "Your compassion knows no bounds! 💗", emoji: "💗" },
    { text: "You inspire everyone around you! 🌟", emoji: "🌟" },
    { text: "Your optimism is contagious! �🇪", emoji: "🇰🇪" },
    { text: "You love fiercely & deeply! 🌹", emoji: "🌹" },
    { text: "You are Tafach 💕", emoji: "💕" },
];

if (startButton) {
    startButton.addEventListener('click', startGame);
}

function startGame() {
    gameActive = true;
    score = 0;
    messageIndex = 0;
    gameContainer.innerHTML = `
        <h2> Mpenzi wangu 💕</h2>
        <p id="score">Messages: ${score} / 20</p>
        <div id="message-display"></div>
        <div id="hearts-container"></div>
    `;
    
    generateHearts(5);
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
    const message = affectionMessages[messageIndex % affectionMessages.length];
    messageDisplay.innerHTML = `
        <div class="message-box">
            <p class="message-text">${message.text}</p>
        </div>
    `;
    messageIndex++;
    
    // Remove the clicked heart
    e.target.style.opacity = '0';
    e.target.style.pointerEvents = 'none';
    setTimeout(() => {
        e.target.remove();
    }, 300);
    
    // Add delay after smile emoji messages
    const delayTime = message.emoji === '😄' ? 2000 : 400;
    
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
                // Show "more to click babe" button with delay
                gameActive = false;
                setTimeout(() => {
                    showMoreButton();
                }, 1700 + delayTime);
            }
        }
    }, 400);
}

function showMoreButton() {
    const endButton = document.getElementById('end-button');
    const messageDisplay = document.getElementById('message-display');
    
    messageDisplay.innerHTML = '<p style="font-size: 80px; margin: 20px 0;">😄</p>';
    
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
            <h2>My Leo 👑</h2>
            <p class="celebration-text" style="font-size: 36px; font-weight: bold; margin: 30px 0; color: #ff1493;">Can you be my Valentine? 💕</p>
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