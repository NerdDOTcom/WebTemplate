let bean = document.getElementById('bean')! as HTMLElement;
let player = document.getElementById('player')! as HTMLElement;
let playerSpeed: number = 4;
let score = document.getElementById("score")! as HTMLDivElement;
let scoring: string | undefined;

// Set initial position of player and bean
let playerPos = { top: 100, left: 100 }; // Player's initial position
let beanPos = { top: 300, left: 300 }; // Bean's initial position
let bt: number = 0;

import { send } from "../utilities";

// Check if there's a user id stored in localStorage, and fetch the score
if (localStorage.getItem("urid") != null) {
    console.log("test");
    scoring = await send("sco", [localStorage.getItem("urid"), bt]);
    console.log("scoring:", scoring);
    score.innerHTML = `Score: ${scoring}`;
}

// Position elements on the screen initially
bean.style.top = `${beanPos.top}px`;
bean.style.left = `${beanPos.left}px`;
player.style.top = `${playerPos.top}px`;
player.style.left = `${playerPos.left}px`;

// Object to track key presses
let keys: { [key: string]: boolean } = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false
};

// Detect when a key is pressed
document.addEventListener('keydown', function (e: KeyboardEvent) {
    if (e.key === "ArrowUp") {
        keys['ArrowUp'] = true;
    }
    if (e.key === "ArrowDown") {
        keys['ArrowDown'] = true;
    }
    if (e.key === "ArrowLeft") {
        keys['ArrowLeft'] = true;
    }
    if (e.key === "ArrowRight") {
        keys['ArrowRight'] = true;
    }
});

// Detect when a key is released
document.addEventListener('keyup', function (e: KeyboardEvent) {
    if (e.key === "ArrowUp") {
        keys['ArrowUp'] = false;
    }
    if (e.key === "ArrowDown") {
        keys['ArrowDown'] = false;
    }
    if (e.key === "ArrowLeft") {
        keys['ArrowLeft'] = false;
    }
    if (e.key === "ArrowRight") {
        keys['ArrowRight'] = false;
    }
});

// Function to move the player based on pressed keys
async function movePlayer(): Promise<void> {
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
        // Update score
        score.innerHTML = `Score: ${bt}`;
        if (localStorage.getItem("urid") != null) {
            scoring = await send("tempsco", [localStorage.getItem("urid"), bt]);
            console.log("scoring:", scoring);
            score.innerHTML = `Score: ${scoring}`;
        }
    }
}

// Game loop to update player movement
function gameLoop(): void {
    movePlayer();
    requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();
