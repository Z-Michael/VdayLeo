let score = 0;
let gameActive = false;
let hearts = [];
let messageIndex = 0;

let startButton;
let gameContainer;

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
    { text: "Your optimism is contagious! ☀️", emoji: "☀️" },
    { text: "You love fiercely & deeply! 🌹", emoji: "🌹" },
    { text: "You are Tafach 💕", emoji: "💕" },
];

// Initialize as soon as script loads
startButton = document.getElementById('start-button');
gameContainer = document.getElementById('game-container');

console.log('Script loaded', { startButton, gameContainer });

if (startButton) {
    console.log('Adding click listener to start button');
    startButton.addEventListener('click', function(e) {
        console.log('Start button clicked!');
        startGame();
    });
} else {
    console.error('Start button not found!');
}

function startGame() {
    console.log('startGame called');
    gameActive = true;
    score = 0;
    messageIndex = 0;
    const startBtn = document.getElementById('start-button');
    
    if (startBtn) startBtn.style.display = 'none';
    
    gameContainer.innerHTML = `
        <h2> Mpenzi wangu 💕</h2>
        <p id="score">Messages: ${score} / 20</p>
        <div id="message-display"></div>
        <div id="hearts-container"></div>
        <div id="button-area"></div>
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
    const messageDisplay = document.getElementById('message-display');
    const buttonArea = document.getElementById('button-area');
    
    // Determine which photo to show based on score - reordered (15, 10, 5)
    let photoPath = 'assets/images/5.png';
    if (score >= 10 && score < 15) {
        photoPath = 'assets/images/10.heic';
    } else if (score >= 5 && score < 10) {
        photoPath = 'assets/images/15.heic';
    }
    
    messageDisplay.innerHTML = `
        <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 15px; padding: 0; margin: 0;">
            <img src="${photoPath}" alt="My Leo" style="width: clamp(280px, 90%, 500px); height: clamp(200px, 60%, 350px); border-radius: 8px; object-fit: cover; border: 5px solid #ff69b4; box-shadow: 0 4px 15px rgba(255, 20, 147, 0.3); max-width: 90vw; max-height: 90vh;">
        </div>
    `;
    
    // Create or get the button
    let endButton = document.getElementById('end-button');
    if (!endButton) {
        endButton = document.createElement('button');
        endButton.id = 'end-button';
        endButton.className = 'game-button';
        buttonArea.appendChild(endButton);
    }
    
    endButton.style.display = 'block';
    endButton.textContent = '💕 More to click babe... 💕';
    endButton.style.background = 'linear-gradient(135deg, #ff69b4 0%, #ff1493 100%)';
    endButton.style.transform = 'scale(1.1)';
    endButton.style.marginTop = '0px';
    endButton.onclick = null;
    endButton.removeEventListener('click', endGame);
    endButton.addEventListener('click', loadNextBatch);
}

function loadNextBatch() {
    const messageDisplay = document.getElementById('message-display');
    const endButton = document.getElementById('end-button');
    
    messageDisplay.innerHTML = '';
    endButton.style.display = 'none';
    generateHearts(5);
    
    gameActive = true;
}

function showCelebration() {
    const startButton = document.getElementById('start-button');
    
    gameActive = false;
    gameContainer.innerHTML = `
        <div class="celebration-box">
            <p class="flower-emoji">🌹🌹🌹</p>
            <h2>My Leo 👑</h2>
            <p class="celebration-text" style="font-size: 36px; font-weight: bold; margin: 30px 0; color: #ff1493;"> Will you be my Valentine? 💕</p>
            <p class="flower-emoji">🌹🌹🌹</p>
        </div>
    `;
    
    startButton.style.display = 'block';
    startButton.textContent = '🔄 Replay 💕';
    startButton.removeEventListener('click', startGame);
    startButton.addEventListener('click', startGame);
}

function endGame() {
    const startButton = document.getElementById('start-button');
    
    gameActive = false;
    gameContainer.innerHTML = `
        <h2>How I Feel 💗</h2>
        <p>You've revealed <strong>${score}</strong> messages!</p>
        <p class="affection-message">You mean everything to me. Forever cherishing you 💕</p>
    `;
    
    startButton.style.display = 'block';
    startButton.textContent = 'Reveal Again';
    startButton.removeEventListener('click', startGame);
    startButton.addEventListener('click', startGame);
}

function handleTouchStart(e) {
    if (e.target.classList.contains('heart')) {
        e.target.style.transform = 'scale(1.2)';
    }
}