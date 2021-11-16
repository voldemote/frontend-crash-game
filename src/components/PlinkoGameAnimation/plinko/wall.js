import Matter from "matter-js";

export default class Wall {
    createWall(x, y, width, height) {
        return Matter.Bodies.rectangle(x, y, width, height, {
            isStatic: true,
            label: "ground",
            render: {
                visible: false,
                fillStyle: "#ff0000",
            },
        });
    }
}
