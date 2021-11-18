import Matter from "matter-js";

export default class Ground{
    createGround(x,y){

       return Matter.Bodies.rectangle(400, 590, 800, 10, {
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