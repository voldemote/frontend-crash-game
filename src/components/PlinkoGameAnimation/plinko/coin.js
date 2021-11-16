import Matter from "matter-js";
import coinImg from "./assets/coin_w.png";

export default class Coin {
    createCoin(x, y) {
        return Matter.Bodies.circle(x, y, 7, {
            restitution: 0.5, //0.2,
            mass: 5,
            label: "coin",
            render: {
                sprite: {
                    texture: coinImg,
                    xScale: 0.1,
                    yScale: 0.1,
                },
            },
        });
    }
}
