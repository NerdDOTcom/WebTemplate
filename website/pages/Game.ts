import { Number2, Circle, isColliding, Entity, move, updateEntities, create_GIR, delete_gir } from "../funcs";
let zim_text= document.getElementById("zim_text") as HTMLDivElement;
let speed = 10;
zim_text.innerHTML = "Try to fight me earth monkey!<br> You won't last a second against ZIM!!!";
let suare = document.getElementById("suare") as HTMLDivElement;
let dead =false;
// Creating the entities
//=======================
let heart: Entity =
{
    img: document.getElementById("heart") as HTMLImageElement,
    circle: 
    {
        pos: {x: 1000, y:500},
        r:10
    },
    // SpeedX: 0,
    speed:0
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
let score =0;
// update function
//=================
function update() {
    if (keys.get("p")) {
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

        move(heart, {x: addX * speed, y: addY * speed});
    }

    for (let i = 0; i < enemies.length; ++i) {
        if (enemies[i].circle.pos.x > 2000) {
            
            delete_gir(enemies,i);
            enemies.push(create_GIR());
        }
    }
     if(score%60 ==0 && dead !=true)
     {

    
    for (let i =0; i < score/100; ++i)
    {
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
    for(let i =0; i <enemies.length; ++i)
    {
        move(enemies[i], {x:  enemies[i].speed, y: 0})
    }
    
    for (let i = 0; i < enemies.length; ++i) {
        if (isColliding(heart.circle, enemies[i].circle)) {
            zim_text.innerHTML = "Victory for ZIM!";
            let dead = true;
            suare.innerHTML = "score:" + score.toString();
            let w = enemies.length;
            for(let i =0; i <w; ++i)
            {
                delete_gir(enemies,0);
            }
            heart.img.remove();
        }
    }

    updateEntities([heart, ...enemies]);
}

setInterval(update, 50 / 3); //60FPS