import Matter from "matter-js";
import winImg1 from "./assets/win_1.png";
import winImg2 from "./assets/win_2.png";
import winImg3 from "./assets/win_3.png";
import winImg4 from "./assets/win_4.png";
import winImg5 from "./assets/win_5.png";
import winImg6 from "./assets/win_6.png";
import winImg7 from "./assets/win_7.png";


export default class WinPot {
    constructor(width, height) {
        this.spacing = (width - 150) / 14;
        this.rowSpacing = (height - 120) / 14;
        this.midPoint = width / 2;

        this.winPots = [];
        this.winImg = [winImg1,winImg2,winImg3,winImg4,winImg5,winImg6,winImg7,winImg6,winImg5,winImg4,winImg3,winImg2,winImg1]
        this.winAmt = [33,11,4,2,1.1,0.6,0.3,0.6,1.1,2,4,11,33]
        
    }
    createWinPot(x, y,m) {
        return Matter.Bodies.rectangle(x, y, this.spacing - 10, 20, {
            isStatic: true, 
            label: `WinPot-${this.winAmt[m]}`,
            restitution:0.5,
            render: {
                sprite: {
                    texture: this.winImg[m],
                    xScale: 0.9,
                    yScale: 0.8
                }
            },
        });
    }
    createPotSeparator(x, y) {
        return Matter.Bodies.rectangle(x, y, 10, 50, {
            isStatic: true, 
            restitution:1,
            label: "PotSeparator",
            render: {
                visible: false,
                fillStyle: "#00ff00",
                
            },
        });
    }

    stackWinPot() {
        let m = 0;   
        for (let i = this.midPoint-this.spacing*6; i <=this.midPoint+this.spacing*6.5; i+=this.spacing) {
            this.winPots.push(this.createWinPot(i, 540,m));
            m++;
        }
            for (let i = this.midPoint-this.spacing*6.5; i <=this.midPoint+this.spacing*7; i+=this.spacing) {
       
            this.winPots.push(this.createPotSeparator(i, 530));
        }
        return this.winPots;
    }
}
