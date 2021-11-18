import Matter from "matter-js";

export default class Plinko {
    constructor(width, height, pos) {
        this.spacing = (width - 150) / 14;
        this.rowSpacing = (height - 120) / 14;
        this.midPoint = width / 2;
        this.pos = pos;
        this.plinkos = [];
    }

    createPlinko(x, y) {
        return Matter.Bodies.circle(x, y, 4, {
            restitution: 0.7,
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
