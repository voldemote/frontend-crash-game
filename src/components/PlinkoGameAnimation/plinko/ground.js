import Matter from "matter-js";

export default class Ground{
    createGround(x,y,width,height){

       return Matter.Bodies.rectangle(x, y,width, height, {
            isStatic: true, //An immovable object
            label:"ground",
            render: {
                // visible: true,
                visible: false,
                fillStyle:"#ff0000"
            }
        });
    }    


}