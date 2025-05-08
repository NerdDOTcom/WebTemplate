export type Number2 = {
    x: number,
    y: number,
}

export type Circle = {
    pos: Number2,
    r: number,
};

export type Entity = {
    div: HTMLDivElement,
    circle: Circle,
};


export function move(entity: Entity, add: Number2) {
    entity.circle.pos = {
        x: entity.circle.pos.x + add.x,
        y: entity.circle.pos.y + add.y
    };
}

export function updateEntities(entities: Entity[]) {
    for (let entity of entities) {
        let pos = entity.circle.pos;
        entity.div.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
    }
}

export function isColliding(c0: Circle, c1: Circle) {
    return distance(c0.pos, c1.pos) <= c0.r + c0.r;

}

function distance(pos0: Number2, pos1: Number2) {
    return Math.sqrt(Math.pow(pos0.x - pos1.x, 2) + Math.pow(pos0.y - pos1.y, 2));
}