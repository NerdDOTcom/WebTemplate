import { Number2, Circle, isColliding, Entity, move, updateEntities, create_GIR, delete_gir, zim_dialog } from "../funcs";
import { send } from "../utilities";
let zim_text = document.getElementById("zim_text") as HTMLDivElement;
let speed = 10;
let zim = document.getElementById("zim") as HTMLImageElement;
let score_div = document.getElementById("score") as HTMLDivElement;
zim_text.innerHTML = "Try to fight me earth monkey!<br> You won't last a second against ZIM!!!";
let suare = document.getElementById("suare") as HTMLDivElement;
let dead = false;
//get settings out of data base 
//set em
// Creating the entities
//=======================
let heart: Entity =
{
    img: document.getElementById("heart") as HTMLImageElement,
    circle:
    {
        pos: { x: 1000, y: 500 },
        r: 10
    },
    movement: _ => 0,
    // SpeedX: 0,
    speed: 0
}
// making the enemies array
//==========================
let enemies: Entity[] = [];

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
let score = 0;
if (localStorage.getItem("zim_sprite") == "2") {
    zim.src = "zim.plotting.png";
}
else {
    zim.src = "zim.yelling.png";
}
// update function
//=================
function update() {
    if (localStorage.getItem("gir") == "true")
    {
        enemies.push(create_GIR());
    }
    if (score % 300 == 0 && dead == false) {
        zim_text.innerHTML = zim_dialog(score)!;
    }

    if (keys.get("p")) {
        keys.set("p", false);
        alert("Paused");
    }
    score += 1;
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

        move(heart, { x: addX * speed, y: addY * speed });
    }
    for (let i = 0; i < enemies.length; ++i) {
        if (enemies[i].circle.pos.x >= 2000) {
            delete_gir(enemies, i);
        }
    }

    if (score % 60 == 0 && dead != true) {


        for (let i = 0; i < score / 100; ++i) {
            enemies.push(create_GIR());
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
    // move(sinEnemy, { x: 5, y: Math.sin(sinEnemy.circle.pos.x / 50) * 10 })
    for (let i = 0; i < enemies.length; ++i) {
        let enemy = enemies[i];
        let newX = enemy.circle.pos.x + enemies[i].speed;
        // move(enemies[i], { x: enemies[i].speed, y: enemies[i].movement() })
        enemy.circle.pos = {
            x: newX,
            y: enemy.movement(newX)
        };
    }

    for (let i = 0; i < enemies.length; ++i) {
        if (isColliding(heart.circle, enemies[i].circle)) {
            zim_text.innerHTML = "Victory for ZIM!";
            dead = true;

            let w = enemies.length;
            for (let i = 0; i < w; ++i) {
                delete_gir(enemies, 0);
            }
            heart.img.style.opacity = "0";

            send("push_score", [score, localStorage.getItem("userId")]);
            score = -300;
            if (localStorage.getItem("death_frame") != null&&localStorage.getItem("death_frame") !="" ) {
                score = -Number(localStorage.getItem("death_frame"));
            }

        }
    }
    if (dead == true && score == 0) {

        dead = false;
        heart.img.style.opacity = "1";
    }
    updateEntities([heart, ...enemies]);
    score_div.innerHTML = "score:" + score.toString();
}

setInterval(update, 50 / 3); //60FPS