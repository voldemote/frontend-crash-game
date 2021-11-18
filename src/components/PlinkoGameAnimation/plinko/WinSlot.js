import Matter from "matter-js";
import winImg1 from "./assets/win_1.png";
import winImg2 from "./assets/win_2.png";
import winImg3 from "./assets/win_3.png";
import winImg4 from "./assets/win_4.png";
import winImg5 from "./assets/win_5.png";
import winImg6 from "./assets/win_6.png";
import winImg7 from "./assets/win_7.png";


export default class WinSlot {
    constructor(colSpace,midPoint,rowSpace,scale) {
        this.spacing = colSpace;
        this.rowSpacing = rowSpace;
        this.midPoint = midPoint;
        this.scale = scale;

        this.winSlots = [];
        this.winImg = [winImg1,winImg2,winImg3,winImg4,winImg5,winImg6,winImg7,winImg6,winImg5,winImg4,winImg3,winImg2,winImg1]
        this.winAmt = [33,11,4,2,1.1,0.6,0.3,0.6,1.1,2,4,11,33]
        
    }
    createWinSlot(x, y,m) {
        return Matter.Bodies.rectangle(x, y, this.spacing - 5, 20, {
            isStatic: true, 
            label: `WinSlot-${this.winAmt[m]}`,
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
    createSlotSeparator(x, y) {
        return Matter.Bodies.rectangle(x, y, 5, 50, {
            isStatic: true, 
            restitution:1,
            label: "PotSeparator",
            render: {
                visible: false,
                fillStyle: "#00ff00",
                
            },
        });
    }

    stackWinSlot() {
        let m = 0;   
        for (let i = this.midPoint-this.spacing*6; i <=this.midPoint+this.spacing*6.5; i+=this.spacing) {
            this.winSlots.push(this.createWinSlot(i, 50+this.rowSpacing*14,m));
            // this.winPots.push(this.createWinSlot(100,100,1));
            m++;
        }
            for (let i = this.midPoint-this.spacing*6.5; i <=this.midPoint+this.spacing*7; i+=this.spacing) {
       
            this.winSlots.push(this.createSlotSeparator(i, 50+this.rowSpacing*14));
        }
        return this.winSlots;
    }
}
