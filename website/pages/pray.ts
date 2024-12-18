

let bean = document.getElementById('bean')!;
let player = document.getElementById('player')!;
let playerSpeed = 4;
let score = document.getElementById("score")! as HTMLDivElement;
let scoring;
// Set initial position of player and bean
let playerPos = { top: 100, left: 100 }; // Player's initial position
let beanPos = { top: 300, left: 300 }; // Bean's initial position
let bt = 0;
import { send } from "../utilities";

if (localStorage.getItem("urid") != null) {
    scoring = await send("sco", [localStorage.getItem("urid"), bt]);
    score.innerHTML = scoring;
}
// Position elements on the screen
bean.style.top = `${beanPos.top}px`;
bean.style.left = `${beanPos.left}px`;
player.style.top = `${playerPos.top}px`;
player.style.left = `${playerPos.left}px`;

// Object to track key presses
let keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false
};

// Detect when a key is pressed
document.addEventListener('keydown', function (e) {
    if (keys.hasOwnProperty(e.key)) {
        keys[e.key] = true; // Mark the key as pressed
    }
});

// Detect when a key is released
document.addEventListener('keyup', function (e: KeyboardEvent) {
    if (keys.hasOwnProperty(e.key)) {
        keys
        keys[e.key] = false; // Mark the key as released
    }
});

// Function to move the player based on pressed keys
function movePlayer() {
    // Up
    if (keys['ArrowUp']) {
        playerPos.top -= playerSpeed;
    }

    // Down
    if (keys['ArrowDown']) {
        playerPos.top += playerSpeed;
    }

    // Left
    if (keys['ArrowLeft']) {
        playerPos.left -= playerSpeed;
    }

    // Right
    if (keys['ArrowRight']) {
        playerPos.left += playerSpeed;
    }

    // Update the player's position on screen
    player.style.top = `${playerPos.top}px`;
    player.style.left = `${playerPos.left}px`;

    // Check if player collides with the bean
    if (Math.abs(playerPos.top - beanPos.top) <= 20 && Math.abs(playerPos.left - beanPos.left) <= 20) {
        // Bean has been collected
        bt = bt + 1;
        // Move the bean to a new random position
        beanPos.top = Math.random() * (window.innerHeight - 20);  // Avoid moving off-screen
        beanPos.left = Math.random() * (window.innerWidth - 20); // Avoid moving off-screen

        // Update the bean's position on screen
        bean.style.top = `${beanPos.top}px`;
        bean.style.left = `${beanPos.left}px`;
    }
}

// Game loop to update player movement
function gameLoop() {
    movePlayer();
    requestAnimationFrame(gameLoop);
}
// Start the game loop
gameLoop();
