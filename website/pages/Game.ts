import { Number2, Circle, isColliding, Entity, move, updateEntities } from "../funcs";

let speed = 10;

// Creating the entities
//=======================
let heart: Entity =
{
    div: document.getElementById("heart") as HTMLDivElement,
    circle: 
    {
        pos: {x: 1000, y:500},
        r:10
    }
}
let eEnemy: Entity = {
    div: document.querySelector(".E_attack") as HTMLDivElement,
    circle: {
        pos: { x: 10, y: 800 * Math.random() },
        r: 10
    }
};
let sinEnemy: Entity = {
    div: document.querySelector(".Sin_attack") as HTMLDivElement,
    circle: {
        pos: { x: 10, y: 800 * Math.random() },
        r: 10
    }
}

// making the enemies array
//==========================
let enemies: Entity[] = [eEnemy, sinEnemy];

// making the keys map
//=====================
let keys = new Map<string, boolean>([
    ["ArrowRight", false],
    ["ArrowLeft", false],
    ["ArrowUp", false],
    ["ArrowDown", false],
    ["p", false]
]);

// setting the values for whether a key is up or down
//====================================================
window.onkeydown = function (e) {
    for (let [keyName] of keys) {
        if (e.key == keyName) {
            keys.set(keyName, true);
        }
    }
};
window.onkeyup = function (e) {
    for (let [keyName] of keys) {
        if (e.key == keyName) {
            keys.set(keyName, false);
        }
    }
};

// update function
//=================
function update() {
    if (keys.get("p")) {
        alert("Paused");
    }

    let dirX = 0;
    let dirY = 0; // dvir I'm saying rn I don't remember all that mambo jumbo
    if (keys.get("ArrowRight")) dirX += 1;
    if (keys.get("ArrowLeft")) dirX -= 1;
    if (keys.get("ArrowUp")) dirY -= 1;
    if (keys.get("ArrowDown")) dirY += 1;

    if (!(dirX == 0 && dirY == 0)) {
        let angle = Math.atan2(dirY, dirX);

        let addX = Math.cos(angle);
        let addY = Math.sin(angle);

        move(heart, {x: addX * speed, y: addY * speed});
    }

    for (let i = 0; i < enemies.length; ++i) {
        if (enemies[i].circle.pos.x > 2000) {
            enemies[i].circle.pos.x = 10;
            enemies[i].circle.pos.y = 800 * Math.random();
        }
    }

    if (heart.circle.pos.x > 1500) {
        heart.circle.pos.x = 1500;
    }
    if (heart.circle.pos.x < 700) {
        heart.circle.pos.x = 700;
    }
    if (heart.circle.pos.y > 780) {
        heart.circle.pos.y = 780;
    }
    if (heart.circle.pos.y < 100) {
        heart.circle.pos.y = 100;
    }    

    move(eEnemy, { x: 5, y: 0 });
    move(sinEnemy, { x: 5, y: Math.sin(sinEnemy.circle.pos.x / 50) * 10 })


    for (let i = 0; i < enemies.length; ++i) {
        if (isColliding(heart.circle, enemies[i].circle)) {
            alert("need to reset here");
        }
    }

    updateEntities([heart, ...enemies]);
}

setInterval(update, 50 / 3); //60FPS