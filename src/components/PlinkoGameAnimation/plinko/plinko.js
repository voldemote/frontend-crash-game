import Matter from "matter-js";

export default class Plinko {
    constructor(pos,r) {
        this.pos = pos;
        this.plinkos = [];
        this.r = r;
    }

    createPlinko(x, y) {
        return Matter.Bodies.circle(x, y, this.r, {
            restitution: 0.2,
            isStatic: true,
            label: "plinko",
            render: {
                fillStyle: "#dbdbdb",
            },
        });
    }

    stackPlinko() {
        this.pos.forEach((level, row) => {
            if (row < 2) return;
            level.forEach((plinko) => {
                this.plinkos.push(this.createPlinko(plinko.x, plinko.y));
            });
        });

        return this.plinkos;
    }
}
