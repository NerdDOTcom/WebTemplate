export type Number2 = {
    x: number,
    y: number,
}

export type Circle = {
    pos: Number2,
    r: number,
};

export type Entity = {
    img: HTMLImageElement,
    circle: Circle,
    speed: number,
    movement: (x: number) => number
};


export function move(entity: Entity, add: Number2) {
    entity.circle.pos = {
        x: entity.circle.pos.x + add.x,
        y: entity.circle.pos.y + add.y
    };
}
export function create_GIR() {

    let y = 800 * Math.random();

    let movements = [
        (x: number) => y, // Constant y
        (x: number) => y + Math.sin(x / 200) * 100, // Sine wave
        (x: number) => y + Math.cos(x / 100) * 50, // Cosine wave
        (x: number) => y + Math.tan(x / 300) * 20, // Tangent wave (be careful, can go infinite)
        (x: number) => y + Math.abs(Math.sin(x / 150)) * 80, // Bouncing sine wave
        (x: number) => y + Math.sin(x / 50) * (x / 500), // Spiral-outward wave
        (x: number) => y + 0.1 * x, // Diagonal upward movement
        (x: number) => y - 0.1 * x, // Diagonal downward movement
        (x: number) => y + Math.sin(x / 50) * 20 + Math.sin(x / 200) * 50, // Superimposed sine waves
    ];

    let rand = Math.floor(movements.length * Math.random());

    let w = 0;

    let addion: Number2 = { x: 20, y: 0 }//typeOfMove()!;
    let break_gir = document.createElement("img");
    let z = Math.floor(3 * Math.random())

    if (z == 0) { break_gir.src = "gir_squint.png"; }
    else if (z == 1) { break_gir.src = "gir_crazy.png"; }
    else {
        break_gir.src = "gir_suite_stare.png";
    }
    let Gir_Entity: Entity =
    {
        img: break_gir as HTMLImageElement,
        circle:
        {
            pos: { x: 10, y: y },
            r: 20
        },
        speed: Math.floor((Math.random() * 5) + 5),
        movement: movements[rand],
    }
    Gir_Entity.img.classList.add("Gir");
    document.body.appendChild(Gir_Entity.img);
    return Gir_Entity
}
export function delete_gir(Gir_Array: Entity[], index: number) {
    Gir_Array[index].img.remove();
    Gir_Array.splice(index, 1);
}

export function updateEntities(entities: Entity[]) {
    for (let entity of entities) {
        let pos = entity.circle.pos;
        entity.img.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
    }
}

export function isColliding(c0: Circle, c1: Circle) {
    return distance(c0.pos, c1.pos) <= c0.r + c0.r;

}

function distance(pos0: Number2, pos1: Number2) {
    return Math.sqrt(Math.pow(pos0.x - pos1.x, 2) + Math.pow(pos0.y - pos1.y, 2));
}
export function zim_dialog(score: number) {
    switch (score) {
        case 0:
            return "YOU WON'T LAST A SECOND AGAINST.... ZZZZZZZZZZZZZZZZZZZIIIIIIIIIIIIIIIIIM!!!!!!!!!"
        case 300:
            return "... you're not dead yet?";
        case 600:
            return "Of course you're not! IRkens like to play with their food!";
        case 900:
            return "my plan is so briliant even I don't know the full extent of it!";
        case 1200:
            return "...";
        case 1500:
            return "This is starting to get akward";
        case 1800:
            return "I guess this is the problem of being so amazing your plan never goes wrong";
        default:
            return "GIR! kill the earth monkey!! faster!!";
    }

}