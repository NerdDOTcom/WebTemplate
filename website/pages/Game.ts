import {Number2, Circle, isColliding } from "../funcs";

let heart = document.getElementById("heart") as HTMLDivElement;
let speed = 10;
let e_attack = document.querySelector(".E_attack") as HTMLDivElement;
let sin_attack = document.querySelector(".Sin_attack") as HTMLDivElement;

// sin_attack.style.transform =`translate(${500}px, ${500}px)`;
let x_sin_attack = 10;
let y_sin_attack = 1000*Math.random();
let x_E_attack = 10;
let y_E_attack = 1000 * Math.random();
let x = 0;
let y = 0;
let heart_pos : Number2 = {x : x, y:y };
let E_attack_pos : Number2 = {x : x_E_attack, y:y_E_attack };
let E_sin_pos : Number2 = {x : x_sin_attack, y:y_sin_attack };
let attack_pos = [E_attack_pos, E_sin_pos];
let keys = new Map<string, boolean>([
    ["ArrowRight", false],
    ["ArrowLeft", false],
    ["ArrowUp", false],
    ["ArrowDown", false],
    ["p", false]
]);

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

function update() {
    if (keys.get("p")) {
        alert("Paused");
        keys.set("p", false)
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

        x += addX * speed;
        y += addY * speed;
    }
    for(let i =0; i <attack_pos.length; ++i)
    {
        // console.log("x: ", attack_pos[i].x);
        if(attack_pos[i].x> 2000)
        {
            attack_pos[i].x = 10;
            attack_pos[i].y = 1000*Math.random();
            // console.log("ininininin");
        }
    }
    // if (x_E_attack > 2000) {
    //     x_E_attack = 10;
    //     y_E_attack = 1000 * Math.random();
    // }
    // if(x_sin_attack > 2000)
    // {
    //     x_sin_attack =10;
    //     y_sin_attack = 1000*Math.random();
    // }
    
    if (x > 1500) {
        x = 1500;
    }
    else if (x < 700) {
        x = 700;
    }
    if (y > 780) {
        y = 780;
    }
    if (y < 100) {
        y = 100;
    }
    attack_pos[1].x += 2;
    attack_pos[1].y += Math.sin(attack_pos[1].x/20)*10;
    // console.log(attack_pos[1].x);
    attack_pos[0].x += 2;
    // move(sin_attack, attack_pos[0]);
    sin_attack.style.transform =`translate(${attack_pos[1].x}px, ${attack_pos[1].y}px)`;
    e_attack.style.transform = `translate(${attack_pos[0].x}px, ${attack_pos[0].y}px)`;
    heart.style.transform = `translate(${x}px, ${y}px)`;

    let heartCircle: Circle = {pos: {x: x, y: y}, r: 10};
    let E_attack_Circle : Circle = {pos: attack_pos[0], r:10};
    let sin_attack_Circle :Circle= {pos: attack_pos[1], r:10};
    let attacks_Circle= [E_attack_Circle,sin_attack_Circle];
    for(let i =0; i < attacks_Circle.length; ++i)
    {
        if(isColliding(heartCircle, attacks_Circle[i]))
            {
                alert("need to reset here");
            } 
    }
    
}

setInterval(update, 50 / 3); //60FPS