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
import WinSlot from "./WinSlot";
import Path from "./path";

import clingSound from "./assets/win.mp3";//cling.wav
import winSound from "./assets/win.mp3";
const hitAudio = new Audio(clingSound);
const winAudio = new Audio(winSound);

export default class Stage extends React.Component {
    constructor(props) {
        super(props);
        this.stageRef = React.createRef();

        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            console.log("yes its mobile");
            this.isMobile = true;
            this.width = window.screen.width;
            this.height = window.screen.height*0.6;
            this.spacing = (this.width) / 14; //column spacing
            this.midPoint = this.width / 2;
            this.rowSpacing = (this.height - 120) / 14;
            this.scale = 0.08;
            this.plinkoR = 2;
            this.barrierHeight = 35;
        } else {
            console.log("not a mobile");
            this.isMobile = false;
            this.width = props.width;
            this.height = props.height;
            this.spacing = (this.width - 150) / 14; //column spacing
            this.midPoint = this.width / 2;
            this.rowSpacing = (this.height - 120) / 14;
            this.scale = 0.1;
            this.plinkoR = 2.5;
            this.barrierHeight = 50;


        }





        this.pos = new Positions(this.spacing,this.midPoint,this.rowSpacing);
        this.positions = this.pos.createPositions();//plinko pin positions
        this.potCenter = this.pos.potCenters(); //winSlot center positions
        // console.log(this.positions);

    }

    componentDidMount() {
        this.canvas = this.stageRef.current;
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
            },
        });

        // this.coin = new Coin().createCoin(this.midPoint, 20);
        // Matter.World.add(this.world, this.coin);

        //create the plinko pins
        this.plinko = new Plinko(this.positions,this.plinkoR).stackPlinko();
        Matter.World.add(this.world, this.plinko);

        //create the ground
        this.ground = new Ground();
        Matter.World.add(this.world, this.ground.createGround(this.midPoint,50+ this.rowSpacing*14.5,this.width,20));

        //left boundary
        this.LW = new Wall();
        Matter.World.add(this.world, this.LW.createWall(this.midPoint - this.spacing * 6.5 - 10, this.height * 0.5, 10, this.height));

        //rignt boundary
        this.RW = new Wall();
        Matter.World.add(this.world, this.RW.createWall(this.midPoint + this.spacing * 6.5 + 10, this.height * 0.5, 10, this.height));

        //create the winning pots
        this.winSlot = new WinSlot(this.spacing,this.midPoint,this.rowSpacing,this.scale).stackWinSlot();
        Matter.World.add(this.world, this.winSlot);


        Matter.Runner.run(this.engine);
        // Matter.Engine.update(engine);
        Matter.Render.run(render);
        Matter.Render.lookAt(render, {
            min: { x: 0, y: 0 },
            max: { x: this.width, y: this.height },
        });

        //listen to collisions
        Events.on(this.engine, "collisionStart", this.collisionStart.bind(this));

        //adding the path to target
        this.p = new Path(this.plinko,this.barrierHeight).createPath();
        Matter.World.add(this.world, this.p);

    }



    collisionStart(event) {
        var pairs = event.pairs.slice();//colliding pairs

        for (let i = 0; i < pairs.length; i++) {

            // coin vs Plnko pin
            if (pairs[i].bodyA.label === "plinko") {
                let b = pairs[i].bodyA;
                let c = pairs[i].bodyB;
                // let cX = c.position.x;



                hitAudio.play();

                //plinko pin animation
                gsap.to(b, {
                    circleRadius: 3,
                    repeat: 2,
                    duration: 0.3,
                    yoyo: true,
                    onStart: () => {
                        gsap.to(b.render, { fillStyle: "#00ff00", duration: 0.2 });
                    },
                    onComplete: () => {
                        b.circleRadius = this.plinkoR;
                        gsap.to(b.render, { fillStyle: "#dbdbdb", duration: 0.2 });
                    },
                });
            }

            //coin vs winSlot
            if (pairs[i].bodyA.label.split("-")[0] === "WinSlot") {
                let b = pairs[i].bodyA;
                let c = pairs[i].bodyB;
                //winner event
                console.log("prize is: " + pairs[i].bodyA.label.split("-")[1]);
                winAudio.play();

                //winSlot animation
                gsap.to(b.position, {
                    y: 50+this.rowSpacing*14+10,
                    repeat: 1,
                    duration: 0.15,
                    yoyo: true,
                    onStart: () => {
                        setTimeout(() => {
                            Matter.World.remove(this.world, c); //remove the coin from the game world
                        }, 120);
                    },
                    onComplete: () => {
                        b.position.y = 50+this.rowSpacing*14;
                    },
                });
            }
        }
    }
    addCoin() {
        // console.log(this.p);
        this.engine.gravity.y = 0.3;//0.15

        for (let i = 0; i < 1; i++) {
            setTimeout(() => {
                let x = Math.random() * (this.midPoint + this.spacing * 0.5 - (this.midPoint - this.spacing * 0.5)) + this.midPoint - this.spacing * 0.5;
                this.coin = new Coin().createCoin(this.midPoint, 20,this.scale);
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
