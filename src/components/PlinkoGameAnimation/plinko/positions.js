export default class Positions {
    constructor(width, height) {
        this.width = width;
        this.height = height;

        this.spacing = (this.width - 150) / 14;
        this.rowSpacing = (this.height - 120) / 14;
        this.midPoint = this.width / 2;

        this.positions = [];

        // this.createPositions();
    }

    potCenters() {
        let a = [];
        for (let i = this.midPoint - this.spacing * 6; i <= this.midPoint + this.spacing * 6.5; i += this.spacing) {
            a.push(i);
        }
        return a;
    }
    createPositions() {
        for (let k = 1; k < 15; k++) {
            this.positions.push(this.creatLevel(k));
        }
        return this.positions;
    }
    creatLevel(level) {
        let la = [];
        switch (level) {
            case 1:
                for (let i = 0; i < 1; i++) {
                    la.push({ x: this.midPoint, y: 50 });
                }
                break;
            case 2:
                for (let i = this.midPoint - this.spacing * 0.5; i <= this.midPoint + this.spacing; i += this.spacing) {
                    la.push({ x: i, y: 50 + this.rowSpacing });
                }
                break;
            case 3:
                for (let i = this.midPoint - this.spacing; i <= this.midPoint + this.spacing * 1.5; i += this.spacing) {
                    la.push({ x: i, y: 50 + this.rowSpacing * 2 });
                }
                break;
            case 4:
                for (let i = this.midPoint - this.spacing * 1.5; i <= this.midPoint + this.spacing * 2; i += this.spacing) {
                    la.push({ x: i, y: 50 + this.rowSpacing * 3 });
                }
                break;
            case 5:
                for (let i = this.midPoint - this.spacing * 2; i <= this.midPoint + this.spacing * 2.5; i += this.spacing) {
                    la.push({ x: i, y: 50 + this.rowSpacing * 4 });
                }
                break;
            case 6:
                for (let i = this.midPoint - this.spacing * 2.5; i <= this.midPoint + this.spacing * 3; i += this.spacing) {
                    la.push({ x: i, y: 50 + this.rowSpacing * 5 });
                }
                break;
            case 7:
                for (let i = this.midPoint - this.spacing * 3; i <= this.midPoint + this.spacing * 3.5; i += this.spacing) {
                    la.push({ x: i, y: 50 + this.rowSpacing * 6 });
                }
                break;
            case 8:
                for (let i = this.midPoint - this.spacing * 3.5; i <= this.midPoint + this.spacing * 4; i += this.spacing) {
                    la.push({ x: i, y: 50 + this.rowSpacing * 7 });
                }
                break;
            case 9:
                for (let i = this.midPoint - this.spacing * 4; i <= this.midPoint + this.spacing * 4.5; i += this.spacing) {
                    la.push({ x: i, y: 50 + this.rowSpacing * 8 });
                }
                break;
            case 10:
                for (let i = this.midPoint - this.spacing * 4.5; i <= this.midPoint + this.spacing * 5; i += this.spacing) {
                    la.push({ x: i, y: 50 + this.rowSpacing * 9 });
                }
                break;
            case 11:
                for (let i = this.midPoint - this.spacing * 5; i <= this.midPoint + this.spacing * 5.5; i += this.spacing) {
                    la.push({ x: i, y: 50 + this.rowSpacing * 10 });
                }
                break;
            case 12:
                for (let i = this.midPoint - this.spacing * 5.5; i <= this.midPoint + this.spacing * 6; i += this.spacing) {
                    la.push({ x: i, y: 50 + this.rowSpacing * 11 });
                }
                break;
            case 13:
                for (let i = this.midPoint - this.spacing * 6; i <= this.midPoint + this.spacing * 6.5; i += this.spacing) {
                    la.push({ x: i, y: 50 + this.rowSpacing * 12 });
                }
                break;
            case 14:
                for (let i = this.midPoint - this.spacing * 6.5; i <= this.midPoint + this.spacing * 7; i += this.spacing) {
                    la.push({ x: i, y: 50 + this.rowSpacing * 13 });
                }
                break;
            default:
                la.push({x:0,y:0});
                break;
        }
        return la;
    }
}
