import Matter from "matter-js";

export default class Path {
    constructor(plinkos, br) {
        this.plinko = plinkos;
        this.barrierHeight = br;



        this.r = [0, 1, 10, 14, 15, 30, 48, 59,83,96];
        this.ra = [-0.2, 0, 0.2, -0.2, 0.3, 0.25, 0, -0.4, 0.4,0.6];
        this.l = [4, 9, 21, 22, 37, 39, 47, 58,71,95];
        this.la = [-0.2, -0.5, -0.3, 0, -0.2,0.3, -0.4, -0.5, 0, 0];

        //0.6 - 2
        // this.r = [0, 1, 10, 14, 15, 30, 48, 59,83,96];
        // this.ra = [-0.2, 0, 0.2, -0.2, 0.3, 0.25, 0, -0.4, 0.4,0.6];
        // this.l = [4, 9, 21, 22, 37, 39, 47, 58,71,95];
        // this.la = [-0.2, -0.5, -0.3, 0, -0.2,0.3, -0.4, -0.5, 0, 0];

        //1.1  -2
        // this.r = [0, 1, 10, 14, 15, 30, 48, 59, 71,97];
        // this.ra = [-0.2, 0, 0.2, -0.2, 0.3, 0.25, 0, -0.4, -0.4,0.3];
        // this.l = [4, 9, 21, 22, 37, 39, 47, 58, 70,84,96];
        // this.la = [-0.2, -0.5, -0.3, 0, -0.2,0.3, -0.4, -0.6, -0.7, 0.3, 0];
       
        //2 -2
        // this.r = [0, 1, 10, 14, 15, 30, 48, 59, 71, 84, 98];
        // this.ra = [-0.2, 0, 0.2, -0.2, 0.3, 0.25, 0, -0.4, -0.4, -0.4, 0];
        // this.l = [4, 9, 21, 22, 37, 39, 47, 58, 70, 83, 97];
        // this.la = [-0.2, -0.5, -0.3, 0, -0.2,0.3, -0.4, -0.6, -0.7, -0.7, -0.5];

        //0.6-1//
        // this.r = [0, 1, 14, 15, 29, 37, 46, 10, 67, 68, 94];
        // this.ra = [-0.2, 0, -0.2, 0.3, 0.25, 0.55, 0.5, 0.2, 0, 0, 0];
        // this.l = [4, 9, 21,22, 56, 36, 80, 81, 93, 45, 57];
        // this.la = [-0.2, -0.5, -0.3, 0,-0.2, 0.5, 0, 0, 0, 0, 0];

        //0.3
        // this.r = [0, 1,14, 15, 29, 37,45, 46, 95, 10, 69];
        // this.ra = [-0.2, 0,-0.2, 0.2, 0.25, 0.55,-0.3 ,0.5, 0.3, 0.2, -0.4];
        // this.l = [4, 9, 21, 56, 68, 81, 82, 36];
        // this.la = [-0.2, -0.5, -0.3, -0.2, -0.5, -0.4, 0.3, 0.5];

        this.guides = [];
    }
    createPath() {
        this.r.forEach((p, i) => {
            this.guides.push(this.createLineR(this.plinko[p].position.x, this.plinko[p].position.y, 1, this.barrierHeight, this.ra[i]));
        });
        this.l.forEach((p, i) => {
            // this.guides.push(this.createLineL(this.plinko[i].position.x,this.plinko[i].position.y,1,50,this.ra[i]));
            this.guides.push(this.createLineL(this.plinko[p].position.x, this.plinko[p].position.y, 1, this.barrierHeight, this.la[i]));
        });
        return this.guides;
    }

    createLineL(x, y, w, h, a) {
        return Matter.Bodies.rectangle(x - 3, y, w, h, {
            isStatic: true, //An immovable object
            label: "leftBar",
            angle: a,
            restitution: 0.7,
            render: {
                visible: true,
                //  visible: false,
                fillStyle: "#00ff00",
            },
        });
    }
    createLineR(x, y, w, h, a) {
        return Matter.Bodies.rectangle(x + 3, y, w, h, {
            isStatic: true, //An immovable object
            label: "rightBar",
            angle: a,
            restitution: 0.7,
            render: {
                visible: true,
                // visible: false,
                fillStyle: "#00ff00",
            },
        });
    }
}
