var bgimg,astroimg,rockimg,rockflyimg,astronaut,rocket,asteroid,astrofly,astroflyimg,astgroup;
var gameState = "Stage1";
var score = 0;
let pg;

function preload(){
  bgimg = loadImage("background.jpg");
  astroimg = loadImage("astronaut.png");
  rockimg = loadImage("rocket.static.png");
  rockflyimg = loadImage("rocket.flying.png");
  ast1 = loadImage("asteroid1.png");
  ast2 = loadImage("asteroid2.png");
  ast3 = loadImage("asteroid3.png");
  earth = loadImage("earth.png");
  astroflyimg = loadImage("astro.sit.png");
}

function setup() {
  createCanvas(1200,600);
  pg = createGraphics(100,100,WEBGL);

  astronaut = createSprite(50,500,50,50);
  astronaut.addImage(astroimg);
  astronaut.scale = 0.15;

  rocket = createSprite(600,400,50,50);
  rocket.addImage("standing",rockimg);
  rocket.addImage("flying",rockflyimg);
  rocket.setCollider("rectangle",0,0,50,100);
  rocket.scale = 2;

  astrofly = createSprite(10,300,50,50);
  astrofly.addImage(astroflyimg);
  astrofly.scale = 0.2;
  astrofly.velocityX = 1;
  astrofly.setCollider("rectangle",10,10,10,10);
  astrofly.debug = false;
  astrofly.visible = false;
  
  astgroup = createGroup();
}

function draw() {
  background(bgimg);

  if(gameState==="Stage1"){
    
    fill(0,255,255);
    stroke(0);
    textSize(22);
    text("SCORE: "+score,10,25);

    if(keyDown(RIGHT_ARROW)){
      astronaut.x += 10;
    }
    if(astronaut.isTouching(rocket)){
      rocket.changeImage("flying",rockflyimg);
      astronaut.destroy();
      rocket.velocityY = -7;
    }
    if(rocket.y<0){
      rocket.destroy();
      bgimg = loadImage("space.jpg");
      gameState ="Stage2";
      score +=50;
    }
  }
  if(gameState==="Stage2"){
    pg.texture(earth);
    pg.rotateY(0.01);
    pg.sphere(pg.width/2.7);
    image(pg,100,450,150,150);

    fill(0,255,255);
    stroke(0);
    textSize(22);
    text("SCORE: "+score,astrofly.x-600,25);

    astrofly.visible = true;

    if(keyDown(UP_ARROW)){
      astrofly.y = astrofly.y-10;
    }
    if(keyDown(DOWN_ARROW)){
      astrofly.y = astrofly.y+10;
    }
    camera.on();
    camera.position.x = astrofly.x;
    camera.position.y = height/2;

    if(astrofly.isTouching(astgroup)){
      score = score-20;
    }
    else{score = score+1}

    if(score===1000){
      gameState="Stage3";
    }
  spawnAsteroids();
  }
  if(gameState==="Stage3"){
    bgimg = loadImage("space2.jpg");
    
    astgroup.destroyEach();

    camera.on();
    camera.position.x = astrofly.x;
    camera.position.y = height/2;
  }
  drawSprites(); 
}

function spawnAsteroids(){
  if(frameCount%10===0){
    var asteroid = createSprite(random(camera.position.x*2.5,camera.position.x*4),random(0,600),20,20);
    asteroid.velocityX = random(-2,-4);
    var rand = Math.round(random(1,3));
    switch(rand){
      case 1:
        asteroid.addImage("asteroid1",ast1);
        break;
      case 2:
      asteroid.addImage("asteroid2",ast2);
        break;
      case 3:
      asteroid.addImage("asteroid3",ast3);
        break;
      default:
        break;
      }
    astgroup.add(asteroid);
    asteroid.scale = 0.2;
    asteroid.lifetime = 800;
    //asteroid.setCollider("rectangle",0,0,20,20);
    asteroid.debug = false;
    }
  }
