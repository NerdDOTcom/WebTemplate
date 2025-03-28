let heart = document.getElementById("heart") as HTMLDivElement;
let speed = 7;


let x = 0;
let y = 0;
let keys = new Map<string, boolean>([
    ["ArrowRight", false],
    ["ArrowLeft", false],
    ["ArrowUp", false],
    ["ArrowDown", false],
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

    heart.style.transform = `translate(${x}px, ${y}px)`;
}

setInterval(update, 50 / 3); //60FPS