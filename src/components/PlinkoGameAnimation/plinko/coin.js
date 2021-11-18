import Matter from "matter-js";
import coinImg from "./assets/coin_w.png";

export default class Coin {
    createCoin(x, y,scale) {
        return Matter.Bodies.circle(x, y, 7, {
            restitution: 0.2, //0.2,
            mass: 5,
            label: "coin",
            // isStatic:true,
            render: {
                sprite: {
                    texture: coinImg,
                    xScale: scale,
                    yScale: scale,
                },
            },
        });
    }
}
