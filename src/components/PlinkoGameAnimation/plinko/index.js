import React from "react";
import Matter from "matter-js";
import { Events } from "matter-js";
import gsap from "gsap";
import "./stage.css";
import Positions from "./positions";
import Coin from "./coin";
import Plinko from "./plinko";
import Ground from "./ground";
import Wall from "./wall";
import WinPot from "./WinPot";

import clingSound from "./assets/cling.wav";
import winSound from "./assets/win.mp3";
const hitAudio = new Audio(clingSound);
const winAudio = new Audio(winSound);

export default class Stage extends React.Component {
    constructor(props) {
        super(props);
        this.stageRef = React.createRef();
        this.width = props.width;
        this.height = props.height;

        this.spacing = (this.width - 150) / 14;
        this.midPoint = this.width / 2;
        this.rowSpacing = (this.height - 120) / 14;

        this.pos = new Positions(this.width, this.height);
        this.positions = this.pos.createPositions();
        this.potCenter = this.pos.potCenters();
        // console.log(this.positions);
    }

    componentDidMount() {
        this.canvas = this.stageRef.current;
        // this.ctx = this.canvas.getContext("2d");

        this.engine = Matter.Engine.create();
        this.world = this.engine.world;
        var render = Matter.Render.create({
            canvas: this.canvas,
            engine: this.engine,
            options: {
                width: this.width,
                height: this.height,
                background: "#000000",
                wireframes: false,
                showAngleIndicator: false,
                // showAxes: true,
                // showCollisions: true,
                // showConvexHulls: true,
            },
        });

        // this.coin = new Coin().createCoin(400, 0);
        // Matter.World.add(this.world, this.coin);

        //call the plinkos
        this.plinko = new Plinko(this.width, this.height, this.positions).stackPlinko();
        Matter.World.add(this.world, this.plinko);

        //create the ground
        this.ground = new Ground();
        Matter.World.add(this.world, this.ground.createGround(400, 50));

        //left boundary
        this.LW = new Wall();
        Matter.World.add(this.world, this.LW.createWall(this.midPoint - this.spacing * 6.5 - 10, this.height * 0.5, 10, this.height));

        //rignt boundary
        this.RW = new Wall();
        Matter.World.add(this.world, this.RW.createWall(this.midPoint + this.spacing * 6.5 + 10, this.height * 0.5, 10, this.height));

        this.winPot = new WinPot(this.width, this.height).stackWinPot();
        Matter.World.add(this.world, this.winPot);

        Matter.Runner.run(this.engine);
        // Matter.Engine.update(engine);
        Matter.Render.run(render);
        Matter.Render.lookAt(render, {
            min: { x: 0, y: 0 },
            max: { x: this.width, y: this.height },
        });

        Events.on(this.engine, "collisionStart", this.collisionStart.bind(this));
        
    }

    collisionStart(event) {
        var pairs = event.pairs.slice();
        this.des = this.potCenter[12];
        for (let i = 0; i < pairs.length; i++) {
            if (pairs[i].bodyA.label === "plinko") {
                let b = pairs[i].bodyA;
                // let c = pairs[i].bodyB;
                hitAudio.play();
                gsap.to(b, {
                    circleRadius: 3,
                    repeat: 2,
                    duration: 0.3,
                    yoyo: true,
                    onStart: () => {
                        gsap.to(b.render, { fillStyle: "#00ff00", duration: 0.2 });
                    },
                    onComplete: () => {
                        b.circleRadius = 4;
                        gsap.to(b.render, { fillStyle: "#dbdbdb", duration: 0.2 });
                    },
                });
            }
            if (pairs[i].bodyA.label.split("-")[0] === "WinPot") {
                // console.log(pairs[i].bodyA);
                let b = pairs[i].bodyA;
                let c = pairs[i].bodyB;
                console.log("prize is: " + pairs[i].bodyA.label.split("-")[1]);
                winAudio.play();
                gsap.to(b.position, {
                    y: 550,
                    repeat: 1,
                    duration: 0.15,
                    yoyo: true,
                    onStart: () => {
                        setTimeout(() => {
                            Matter.World.remove(this.world, c);
                        }, 120);
                    },
                    onComplete: () => {
                        b.position.y = 540;
                    },
                });
            }
        }
    }
    addCoin() {
        this.engine.gravity.y = 0.15;

        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                let x = Math.random() * (this.midPoint + this.spacing * 0.5 - (this.midPoint - this.spacing * 0.5)) + this.midPoint - this.spacing * 0.5;
                this.coin = new Coin().createCoin(Math.floor(x), 50);
                Matter.World.add(this.world, this.coin);
            }, 1000 * i);
        }
    }

    render() {
        return (
            <div className="plinko_stage">
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        this.addCoin();
                    }}
                >
                    Start
                </button>
                <input
                    type="range"
                    onChange={(e) => {
                        e.preventDefault();
                        winAudio.volume = e.target.value / 100;
                        hitAudio.volume = e.target.value / 100;
                    }}
                />
                <canvas ref={this.stageRef}></canvas>
            </div>
        );
    }
}
