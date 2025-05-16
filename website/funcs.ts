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
    // movement: () => number
};


export function move(entity: Entity, add: Number2) {
    entity.circle.pos = {
        x: entity.circle.pos.x + add.x,
        y: entity.circle.pos.y + add.y
    };
}
export function create_GIR() {
    let addion: Number2 = { x: 20, y: 0 }//typeOfMove()!;
    let break_gir = document.createElement("img");
    break_gir.src = "gir_squint.png";
    let Gir_Entity: Entity =
    {
        img: break_gir as HTMLImageElement,
        circle:
        {
            pos: { x: 10, y: 800 * Math.random() },
            r: 20
        },
        speed: Math.floor((Math.random() * 5)+5),
        // movement: (x) => 0
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
function typeOfMove() {
    let x;
    let y;
    switch (Math.floor((Math.random() * 10))) {
        case 0:
            x = 2;
            break;
        case 1:
            x = 10;
            break;
        default:
            x = 5;
            break;
    }
    switch (Math.floor((Math.random() * 10))) {
        case 0:
            y = 1;
            break;
        case 1:
            y = Math.sin(x / 50) * 10;
            break;
        case 2:
            y = Math.cos(x / 50) * 10;
            break;
        case 3:
            y = Math.tan(x);
        case 4:
            y = Math.sin(x / 50) * 10;
        default:
            y = 0;
            break;
            let n: Number2 = { x, y };
            return n;
    }
}
export function zim_dialog(score: number)
{
    switch (score)
{
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
        "GIR! kill the earth monkey!! faster!!";
}


}