import * as PIXI from 'pixi.js-legacy';
import TWEEN from '@tweenjs/tween.js';


window.PIXI = PIXI;
// create the root of the scene graph
var stage = new PIXI.Container();

// create a texture from an image path
let texture = PIXI.Texture.from(require('./assets/cannon.png').default);
let carrotTex = PIXI.Texture.from(require('./assets/alpaca-flying.png').default);
let crash = PIXI.Texture.from(require('./assets/alpaca-crash.png').default);
let inCannon = PIXI.Texture.from(require('./assets/alpaca-in-cannon.png').default);
let explosion = PIXI.Texture.from(require('./assets/cannon-explotion.png').default);
let bg = PIXI.Texture.from(require('./assets/background.png').default);

// create a new Sprite using the texture
let cannon = new PIXI.Sprite(texture);
let alpaCrash = new PIXI.Sprite(crash);
let alpaCannon = new PIXI.Sprite(inCannon);
let alpaExplosion = new PIXI.Sprite(explosion);
var bullets = [];
var bulletSpeed = 5;

var renderer = PIXI.autoDetectRenderer(800, 600,{backgroundColor : 0x1099bb});

class AnimationController {
  init({ref}) {
    ref.current.appendChild(renderer.view);
    // center the sprite's anchor point
    cannon.scale.set(0.3);
    cannon.anchor.x = 0.5;
    cannon.anchor.y = 0.5;

    // move the sprite to the center of the screen
    cannon.position.x = 400;
    cannon.position.y = 500;

    let background = new PIXI.Sprite(bg);
    background.scale.x = 0.45;
    background.scale.y = 0.45;
    background.position.x = -51;
    background.position.y = 65;
    // ALPA CANNON
    alpaCannon.scale.x = 0.4;
    alpaCannon.scale.y = 0.4;
    alpaCannon.position.x = 367;
    alpaCannon.position.y = 326;
    alpaExplosion.scale.x = 0.28;
    alpaExplosion.scale.y = 0.28;
    alpaExplosion.position.x = 332;
    alpaExplosion.position.y = 350;
    stage.addChild(background);
    stage.addChild(alpaCannon)
    stage.addChild(alpaExplosion);
    stage.addChild(cannon);
    alpaExplosion.visible=false;
    

    //TO DO: Audio init
    stage.interactive = true;

    stage.on("mousedown", function(e){
      shoot(cannon.rotation, {
        x: cannon.position.x,
        y: cannon.position.y-200
      });
    })
    return true
  }
}
function shoot(rotation, startPosition){
  alpaCannon.visible = false;
  //alpaExplosion.visible=true;
  new TWEEN.Tween(alpaExplosion)
    .to({ alpha: 0 }, 300)
    .onUpdate(() => {
      // newBar.scale.set(scaleData.x, scaleData.y);
      console.warn('bar alpha update');
    })
    .onComplete(() => {
      console.warn('bar alpha complete');
    })
    .easing(TWEEN.Easing.Back.Out)
    .start();
  var bullet = new PIXI.Sprite(carrotTex);
  bullet.position.x = startPosition.x;
  bullet.position.y = startPosition.y;
  bullet.rotation = rotation;
  stage.addChild(bullet);
  bullets.push(bullet); 
  
}

function rotateToPoint(mx, my, px, py){
  var self = this;
  var dist_Y = my - py;
  var dist_X = mx - px;
  var angle = Math.atan2(dist_Y,dist_X);
  //var degrees = angle * 360/ Math.PI;
  return angle;
}

// start animating
animate();

function animate(time) {
  requestAnimationFrame(animate);
  TWEEN.update(time);

  // just for fun, let's rotate mr rabbit a little
  //cannon.rotation = rotateToPoint(renderer.plugins.interaction.mouse.global.x, renderer.plugins.interaction.mouse.global.y, cannon.position.x, cannon.position.y);

  for(var b=bullets.length-1;b>=0;b--){
    bullets[b].position.x += Math.cos(bullets[b].rotation)*bulletSpeed;
    bullets[b].position.y += Math.sin(bullets[b].rotation)*bulletSpeed;
  }
  // render the container
  renderer.render(stage);
}

export default new AnimationController();
